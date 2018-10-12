using RestaurantPortal.Models;
using System.Collections.Generic;

namespace RestaurantPortal.Db.Repositories
{
    public interface IOrderRepository
    {
        int SaveOrder(OrderDto order);
        List<OrderDto> GetOrdersForRestaurant(int restaurantId, OrderStatus status); 
    }
}
