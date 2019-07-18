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
        public IActionResult GetAll([FromQuery]string category, [FromQuery]string search, [FromQuery]bool related= false)
        {
            IQueryable<Product> query = context.Products;
            if (!string.IsNullOrWhiteSpace(category))
            {
                string categoryLower = category.ToLower();
                query = query.Where(p => p.Category.ToLower().Contains(categoryLower));
            }
            if (!string.IsNullOrWhiteSpace(search))
            {
                string searchStr = search.ToLower();
                query = query.Where(p => $"{p.Name.ToLower()} {p.Description.ToLower()}".Contains(searchStr));
            }
            if (related)
            {
                query = query.Include(p => p.Supplier).Include(p => p.Ratings);
                List<Product> data = query.ToList();
                data.ForEach(p =>
                {
                    if (p.Supplier!=null)
                    {
                        p.Supplier.Products = null;
                    }
                    if (p.Ratings!=null)
                    {
                        p.Ratings.ForEach(r => r.Product = null);
                    }
                });
                return Ok(data);
            }
            else
            {
                return Ok(query);
            }
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
                    product.Supplier.Products = product.Supplier.Products.Select(p=>
                    new Product
                    {
                        ProductId = p.ProductId,
                        Name = p.Name,
                        Category = p.Category,
                        Description = p.Description,
                        Price = p.Price
                    }
                    );
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