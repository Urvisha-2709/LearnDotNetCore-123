using Microsoft.AspNetCore.Mvc;
using AspNetCoreWebAPI.Services;
using AspNetCoreWebAPI.Models;
using System.Collections.Generic;

namespace AspNetCoreWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;
    

        public ProductController(ProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var products = _productService.GetProducts();
            return Ok(products);
        }

        [HttpPost]
        public IActionResult Post(Product product)
        {
            _productService.AddProduct(product);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _productService.DeleteProduct(id);

            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Product product)
        {
            if (id != product.Id)
            {
                return BadRequest("Invalid id provided");
            }

            _productService.UpdateProduct(product);

            return Ok();
        }

                [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var product = _productService.GetProductById(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

    }
}
