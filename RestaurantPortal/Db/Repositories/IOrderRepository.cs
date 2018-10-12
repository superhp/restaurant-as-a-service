using RestaurantPortal.Models;
using System.Collections.Generic;

namespace RestaurantPortal.Db.Repositories
{
    public interface IOrderRepository
    {
        int SaveOrder(OrderDto order);
        void ChangeOrderStatus(int orderId, OrderStatus status);
        List<OrderDto> GetOrdersForRestaurant(int restaurantId, OrderStatus status); 
    }
}
