using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SportsStore.WebApi.Models;

namespace SportsStore.WebApi.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderValuesController : ControllerBase
    {
        private DataContext context;

        public OrderValuesController(DataContext dataContext)
        {
            context = dataContext;
        }

        [HttpGet]
        public IActionResult GetOrders()
        {
            return Ok(context.Orders.Include(o => o.Products).Include(o => o.Payment));
        }

        [HttpPost("{id}")]
        public void MarkShipped([FromRoute]long id)
        {
            Order order = context.Orders.Find(id);
            if (order!=null)
            {
                order.Shipped = true;
                context.SaveChanges();
            }
        }

        [HttpPost]
        public IActionResult CreateOrder([FromBody]Order order)
        {
            if (ModelState.IsValid)
            {
                order.OrderId = 0;
                order.Shipped = false;
                order.Payment.Total = this.GetPrice(order.Products);

                ProcessPayment(order.Payment);
                if (order.Payment.AuthCode!=null)
                {
                    context.Orders.Add(order);
                    context.SaveChanges();
                    return Ok(new
                    {
                        orderId = order.OrderId,
                        authCode = order.Payment.AuthCode,
                        amount = order.Payment.Total
                    });
                }
                else
                {
                    return BadRequest("Payment rejected");
                }
            }
            return BadRequest(ModelState);
        }

        [NonAction]
        private void ProcessPayment(Payment payment)
        {
            payment.AuthCode = "12345";
        }

        [NonAction]
        private decimal GetPrice(IEnumerable<CartLine> lines)
        {
            IEnumerable<long> ids = lines.Select(l => l.ProductId);
            return context.Products
                          .Where(p => ids.Contains(p.ProductId))
                          .Select(p => lines.First(l => l.ProductId.Equals(p.ProductId)).Quantity * p.Price)
                          .Sum();
        }
    }
}