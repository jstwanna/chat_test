using Chat.Data.Database;
using Chat.Hubs;
using LinqToDB;
using LinqToDB.AspNet;
using LinqToDB.AspNet.Logging;

var builder = WebApplication.CreateBuilder(args);

ConfigureServices(builder);

var app = builder.Build();

app.Services.GetRequiredService<DBMigrations>().Apply();

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUI();
}


app.UseCors("cors");
app.UseHttpsRedirection();

app.UseAuthorization();
app.UseStaticFiles();

app.ConfigureHubs();
app.MapControllers();

app.Run();


static void ConfigureServices (IHostApplicationBuilder builder)
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
            "cors",
            p =>
            p
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin());
    });
}