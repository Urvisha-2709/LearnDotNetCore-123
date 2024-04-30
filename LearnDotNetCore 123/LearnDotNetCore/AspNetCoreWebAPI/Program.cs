using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using AspNetCoreWebAPI.Services;
using Microsoft.AspNetCore.Cors.Infrastructure;
using System;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register ProductService with the dependency injection container
builder.Services.AddSingleton<ProductService>();

// Configure the ConnectionString options
builder.Services.Configure<ConnectionString>(builder.Configuration.GetSection("ConnectionString"));


var allowedOrigin = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("myAppCors", policy =>
    {
        policy.WithOrigins(allowedOrigin)
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

app.UseHttpsRedirection();
app.UseCors("myAppCors");
app.UseAuthorization();
app.MapControllers();
app.Run();

public class ConnectionString
{
    public string? ProjectConnection { get; set; }
    public string? MyNullableString { get; set; }
    public string MyNonNullableString { get; set; }
}

