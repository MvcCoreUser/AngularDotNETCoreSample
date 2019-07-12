using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SportsStore.WebApi.Models;

namespace SportsStore.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        [NonAction]
        private Product[] ProductArray()
        {
            Product[] products =
                {
                    new Product{Name="Kayak", Price=275M, Category="Watersports", ProductId=1},
                    new Product{Name="Lifejacket", Price=48.95M, Category="Watersports", ProductId=2},
                    new Product{Name="Soccer ball", Price=19.50M, Category="Soccer", ProductId=3},
                    new Product{Name="Corner flag",Price=34.95M, Category="Soccer", ProductId=4}
            };
            return products;
        }

        [HttpGet("[action]")]
        public IActionResult GetAll()
        {
            var products = this.ProductArray();
            return Ok(products);
        }
    }

    
}