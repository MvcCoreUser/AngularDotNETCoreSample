using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace SportsStore.WebApi.Models
{
    public class Order
    {
        [BindNever]
        public long OrderId { get; set; }

        [Required]
        public string Name { get; set; }

        public IEnumerable<CartLine> Products { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public Payment Payment{ get; set; }

        [BindNever]
        public bool Shipped { get; set; }
    }

    public class Payment
    {
        [BindNever]
        public long PaymentId { get; set; }

        [Required]
        public string CardNumber { get; set; }

        [Required]
        public string CardExpiry { get; set; }

        [Required]
        public int CardSecurityCode { get; set; }

        [BindNever]
        public decimal Total { get; set; }

        [BindNever]
        public string AuthCode { get; set; }
    }

    public class CartLine
    {
        [BindNever]
        public long CartLineId { get; set; }

        [Required]
        public long ProductId { get; set; }

        [Required]
        public long Quantity { get; set; }
    }
}
