using RestaurantPortal.Models;

namespace RestaurantPortal.Db.Repositories
{
    public interface IRestaurantRepository
    {
        void Update(RestaurantDto restaurantDto);
        RestaurantDto Get(int id);
    }
}