using Microsoft.AspNetCore.Mvc;
using RestaurantPortal.Db.Repositories;
using RestaurantPortal.Models;

namespace RestaurantPortal.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private readonly IOrderRepository _orderRepository;

        public OrderController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpPost]
        public int CreateOrder([FromBody]OrderDto order)
        {
            var orderId = _orderRepository.SaveOrder(order);
            return orderId;
        }

        [HttpGet("restaurant/{restaurantId}")]
        public OrdersForRestaurantDto GetOrdersForRestaurant(int restaurantId)
        {
            return new OrdersForRestaurantDto
            {
                CreatedOrders = _orderRepository.GetOrdersForRestaurant(restaurantId, OrderStatus.Ordered),
                InProgressOrders = _orderRepository.GetOrdersForRestaurant(restaurantId, OrderStatus.InProgress),
                DoneOrders = _orderRepository.GetOrdersForRestaurant(restaurantId, OrderStatus.Done)
            };
        }
    }
}
