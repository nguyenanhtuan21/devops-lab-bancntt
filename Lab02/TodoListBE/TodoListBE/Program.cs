using TodoListBE.BL.Services;
using TodoListBE.Core.Entities;
using TodoListBE.Infrastructure.Repository;

var builder = WebApplication.CreateBuilder(args);

var myAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<ITodoRepository, TodoRepository>();
builder.Services.AddSingleton<ITodoService, TodoService>();

// trả về JSON ParcalCase
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });

// enable cors
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowSpecificOrigins, policy =>
    {
        policy.WithOrigins("http://localhost:8080", 
            "http://localhost:8088")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(myAllowSpecificOrigins);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
