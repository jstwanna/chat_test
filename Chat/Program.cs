using Chat.Data.Database;
using Chat.Data.Models.Account;
using Chat.Hubs;
using LinqToDB;
using LinqToDB.AspNet;
using LinqToDB.AspNet.Logging;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

string devAllowCors = "dev_cors";
var builder = WebApplication.CreateBuilder(args);

ConfigureServices(builder, devAllowCors);

var app = builder.Build();

app.Services.GetRequiredService<DBMigrations>().Apply();

if (app.Environment.IsDevelopment())
{
    app.UseCors(devAllowCors);
    app.UseOpenApi();
    app.UseSwaggerUi(config =>
    {
        config.PersistAuthorization = false;
    });
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseStaticFiles();

app.ConfigureHubs();
app.MapControllers();

app.Run();


static void ConfigureServices (IHostApplicationBuilder builder, string devCors)
{
    var connStr = builder.Configuration.GetConnectionString("Default")!;
    var dbOptions = new DBOptions
    {
        connStr = connStr,
    };

    builder.Services.AddSingleton(dbOptions);
    builder.Services.AddTransient<DBMigrations>();

    builder.Services.AddLinqToDBContext<DBContext>((provider, options) =>
        options
            .UsePostgreSQL(connStr)
            .UseDefaultLogging(provider));

    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
    builder.Services.AddSwaggerDocument();
    builder.Services.AddSignalR();
    builder.Services.AddCors(option =>
    {
        option.AddPolicy(
            devCors,
            p =>
            p
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin());
    });
    builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer(o =>
    {
        o.TokenValidationParameters = new TokenValidationParameters
        {
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)),
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true
        };
    });
    builder.Services.AddAuthorization();
    builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"));
}