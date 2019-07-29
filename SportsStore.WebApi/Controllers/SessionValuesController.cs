using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SportsStore.WebApi.Models;

namespace SportsStore.WebApi.Controllers
{
    [Route("api/session")]
    [ApiController]
    public class SessionValuesController : ControllerBase
    {
        [HttpGet("cart")]
        public async Task<IActionResult> GetCart()
        {
            await HttpContext.Session.LoadAsync();
            var data = HttpContext.Session.GetString("cart");
            if (string.IsNullOrEmpty(data))
            {
                return BadRequest("No data");
            }
            return Ok(data);
        }

        [HttpPost("cart")]
        public async Task<IActionResult> SetCart([FromBody] ProductSelection[] products)
        {
            var json = JsonConvert.SerializeObject(products);
            HttpContext.Session.SetString("cart", json);
            await HttpContext.Session.CommitAsync();
            return Ok(new {result= "success" });

        }
    }
}