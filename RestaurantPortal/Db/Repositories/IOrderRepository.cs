using RestaurantPortal.Models;
using System.Collections.Generic;

namespace RestaurantPortal.Db.Repositories
{
    public interface IOrderRepository
    {
        int SaveOrder(OrderDto order);
        List<OrderDto> GetOrdersForRestaurant(int restaurantId, OrderStatus status);
        List<OrderDto> GetOrdersForCustomer(int customerId, OrderStatus status);
        List<OrderDto> GetOrdersForCustomer(int customerId);
        void ChangeOrderStatus(int orderId, OrderStatus status);
    }
}
