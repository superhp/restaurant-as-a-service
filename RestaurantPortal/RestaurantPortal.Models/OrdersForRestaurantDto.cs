using System.Collections.Generic;

namespace RestaurantPortal.Models
{
    public class OrdersForRestaurantDto
    {
        public List<OrderDto> CreatedOrders { get; set; }
        public List<OrderDto> InProgressOrders { get; set; }
        public List<OrderDto> DoneOrders { get; set; }
    }
}
