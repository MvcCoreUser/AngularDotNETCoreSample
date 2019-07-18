using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SportsStore.WebApi.Models;
using SportsStore.WebApi.Models.BindingTargets;

namespace SportsStore.WebApi.Controllers
{
    [Route("api/suppliers")]
    [ApiController]
    public class SupplierValuesController : ControllerBase
    {
        private DataContext context;

        public SupplierValuesController(DataContext dataContext)
        {
            context = dataContext;
        }

        [HttpGet]
        public IEnumerable<Supplier> Get()
        {
            return context.Suppliers;
        }

        [HttpPost]
        public IActionResult Create([FromBody] SupplierData supplierData)
        {
            if (ModelState.IsValid)
            {
                Supplier supplier = supplierData.Supplier;
                context.Add(supplier);
                context.SaveChanges();
                return Ok(supplier.SupplierId);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}