using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SportsStore.WebApi.Models.BindingTargets
{
    public class SupplierData
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        [StringLength(2, MinimumLength =2)]
        public string State { get; set; }

        public Supplier Supplier => new Supplier
        {
            Name = this.Name,
            City = this.City,
            State = this.State
        };
    }
}
