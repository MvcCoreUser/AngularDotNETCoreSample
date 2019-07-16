using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            var product = context.Products
                                 .Include(p=>p.Supplier)
                                 .Include(p=>p.Ratings)
                                 .FirstOrDefault(p=>p.ProductId.Equals(id));
            if (product!=null)
            {
                if (product.Supplier!=null)
                {
                    product.Supplier.Products = null;
                }
                if (product.Ratings!=null)
                {
                    foreach (var item in product.Ratings)
                    {
                        item.Product = null;
                    }
                }
            }

            //System.Threading.Thread.Sleep(2000);
            return Ok(product);
        }
    }

    
}