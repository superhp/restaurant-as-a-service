using System.Collections.Generic;
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
                NewOrders = _orderRepository.GetOrdersForRestaurant(restaurantId, OrderStatus.Ordered),
                ProcessingOrders = _orderRepository.GetOrdersForRestaurant(restaurantId, OrderStatus.InProgress),
                FinishedOrders = _orderRepository.GetOrdersForRestaurant(restaurantId, OrderStatus.Done)
            };
        }

        [HttpGet("customer/{customerId}")]
        public List<OrderDto> GetOrdersForCustomer(int customerId, [FromQuery] OrderStatus? status = null)
        {
            return status == null ? _orderRepository.GetOrdersForCustomer(customerId)
                : _orderRepository.GetOrdersForCustomer(customerId, (OrderStatus) status);
        }

        [HttpPatch("{orderId}/{status}")]
        public void UpdateOrderStatus(int orderId, OrderStatus status)
        {
            _orderRepository.ChangeOrderStatus(orderId, status);
        }
    }
}
