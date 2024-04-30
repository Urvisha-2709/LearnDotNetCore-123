using Microsoft.Extensions.DependencyInjection;
using AspNetCoreWebAPI.Services;
using System;

namespace AspNetCoreWebAPI.Models
{
    public class Product
    {
        public Product(Int32 id, string name, decimal price)
    {
        Id = id;
        Name = name;
        Price = price;
    }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public Int32 Id { get; set; }
    }
}