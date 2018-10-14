using System.Collections.Generic;
using RestaurantPortal.Models;

namespace RestaurantPortal.Db.Repositories
{
    public interface IRestaurantRepository
    {
        void Update(RestaurantDto restaurantDto);
        RestaurantDto Get(int id);
        IEnumerable<RestaurantDto> GetAll();
    }
}