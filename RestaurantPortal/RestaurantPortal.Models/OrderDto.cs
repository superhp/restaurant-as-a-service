using System.Collections.Generic;

namespace RestaurantPortal.Models
{
    public class OrderDto
    {
        public int OrderId { get; set; }
        public int CustomerId { get; set; }
        public decimal PaidPrice { get; set; }
        public string Table { get; set; }
        public List<MenuItemDto> Items { get; set; }
        public OrderStatus Status { get; set; }
    }
}
