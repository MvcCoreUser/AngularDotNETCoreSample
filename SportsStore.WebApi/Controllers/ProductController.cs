using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SportsStore.WebApi.Models;

namespace SportsStore.WebApi.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductValuesController : ControllerBase
    {
        private DataContext context;

        public ProductValuesController(DataContext dataContext)
        {
            context = dataContext;
        }
       
        [HttpGet(template:"")]
        public IActionResult GetAll()
        {
            var products = context.Products.AsQueryable().ToList();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute]long id)
        {
            var product = context.Products.Find(id);
            return Ok(product);
        }
    }

    
}