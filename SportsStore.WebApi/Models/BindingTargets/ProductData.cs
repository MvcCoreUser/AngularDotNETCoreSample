using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SportsStore.WebApi.Models.BindingTargets
{
    public class ProductData
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        public string Description { get; set; }

        [Range(1, int.MaxValue, ErrorMessage ="Price must be at least 1")]
        public decimal Price { get; set; }

        public long SupplierId { get; set; }

        public Product Product => new Product
        {
            Name = this.Name,
            Category = this.Category,
            Description = this.Description,
            Price = this.Price,
            Supplier = this.SupplierId == 0 ? null : new Supplier { SupplierId = this.SupplierId }
        };
    }
}
