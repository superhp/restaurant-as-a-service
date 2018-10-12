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

        [HttpGet]
        public void GetOrder(int id)
        {
            
        }

        [HttpGet]
        public void GetOrders(int id)
        {
            
        }
    }
}
