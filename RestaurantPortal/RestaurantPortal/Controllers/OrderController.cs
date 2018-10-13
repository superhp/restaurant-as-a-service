using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using RestaurantPortal.Db.Repositories;
using RestaurantPortal.Models;
using Stripe;

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
        public int CreateOrder([FromBody]OrderDto orderDto)
        {
            try
            {
                var orderId = _orderRepository.SaveOrder(orderDto);
                var order = _orderRepository.GetOrder(orderId);
                var amount = order.Items.Sum(i => i.Price * i.Quantity);
                _orderRepository.UpdateOrderAmount(order.OrderId, amount);
                // Use Stripe's library to make request
                var chargeOptions = new StripeChargeCreateOptions
                {
                    Amount = Convert.ToInt32(amount * 100),
                    Currency = "eur",
                    SourceTokenOrExistingSourceId = "tok_nl",
                    Metadata = new Dictionary<string, string>
                    {
                        { "OrderId", order.OrderId.ToString()}
                    }
                };

                var chargeService = new StripeChargeService();
                var charge = chargeService.Create(chargeOptions);

                return order.OrderId;
            }
            catch (StripeException e)
            {
                switch (e.StripeError.ErrorType)
                {
                    case "card_error":
                        Console.WriteLine("Code: " + e.StripeError.Code);
                        Console.WriteLine("Message: " + e.StripeError.Message);
                        break;
                    case "api_connection_error":
                        break;
                    case "api_error":
                        break;
                    case "authentication_error":
                        break;
                    case "invalid_request_error":
                        break;
                    case "rate_limit_error":
                        break;
                    case "validation_error":
                        break;
                    default:
                        // Unknown Error Type
                        break;
                }
            }

            return -1;
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

        [HttpGet("{id}")]
        public OrderDto Get(int id)
        {
            var order = _orderRepository.GetOrder(id);

            return order;
        }
    }
}
