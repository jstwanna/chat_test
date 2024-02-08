using Chat.Hubs;

var builder = WebApplication.CreateBuilder(args);

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

var app = builder.Build();

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
