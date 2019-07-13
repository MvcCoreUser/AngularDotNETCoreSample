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
        private DataContext context;

        public ProductController(DataContext dataContext)
        {
            context = dataContext;
        }
       
        [HttpGet("[action]")]
        public IActionResult GetAll()
        {
            var products = context.Products.AsQueryable().ToList();
            return Ok(products);
        }

        [HttpGet("[action]/{id}")]
        public IActionResult GetById([FromRoute]long id)
        {
            var product = context.Products.Find(id);
            return Ok(product);
        }
    }

    
}