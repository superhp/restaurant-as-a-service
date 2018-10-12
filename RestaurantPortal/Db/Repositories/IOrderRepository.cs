using RestaurantPortal.Models;

namespace RestaurantPortal.Db.Repositories
{
    public interface IOrderRepository
    {
        int SaveOrder(OrderDto order);
    }
}
