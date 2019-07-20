using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsStore.WebApi.Models;
using SportsStore.WebApi.Models.BindingTargets;

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
       
        [HttpGet]
        public IActionResult GetProducts([FromQuery]string category, [FromQuery]string search, [FromQuery]bool related= false)
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
        public IActionResult GetProductById([FromRoute]long id)
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

        [HttpPost]
        public IActionResult CreateProduct([FromBody] ProductData productData)
        {
            if (ModelState.IsValid)
            {
                Product product = productData.Product;
                if (product.Supplier!=null && product.Supplier.SupplierId!=0)
                {
                    context.Attach(product.Supplier);
                }
                context.Add(product);
                context.SaveChanges();
                return Ok(product.ProductId);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPut("{id}")]
        public IActionResult ReplaceProduct([FromRoute] long id, [FromBody] ProductData productData)
        {
            if (ModelState.IsValid)
            {
                Product product = productData.Product;
                product.ProductId = id;
                if (product.Supplier!=null && product.Supplier.SupplierId!=0)
                {
                    context.Attach(product.Supplier);
                }
                context.Update(product);
                context.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPatch("{id}")]
        public IActionResult UpdateProduct([FromRoute]long id, [FromBody] JsonPatchDocument<ProductData> jsonPatch)
        {
            Product product = context.Products.Include(p => p.Supplier).First(p => p.ProductId.Equals(id));
            ProductData productData = new ProductData { Product = product };
            jsonPatch.ApplyTo(productData, ModelState);
            if (ModelState.IsValid && TryValidateModel(productData))
            {
                if (product.Supplier!=null && product.Supplier.SupplierId!=0)
                {
                    context.Attach(product.Supplier);
                }
                context.SaveChanges();
                return Ok(); 
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct([FromRoute]long id)
        {
            context.Products.Remove(new Product { ProductId = id });
            context.SaveChanges();
            return NoContent();
        }


    }

    
    
}