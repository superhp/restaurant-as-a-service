using System.Collections.Generic;

namespace RestaurantPortal.Models
{
    public class OrdersForRestaurantDto
    {
        public List<OrderDto> NewOrders { get; set; }
        public List<OrderDto> ProcessingOrders { get; set; }
        public List<OrderDto> FinishedOrders { get; set; }
    }
}
