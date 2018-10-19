using System.Collections;
using System.Collections.Generic;
using RestaurantPortal.Models;

namespace RestaurantPortal.Db.Repositories
{
    public interface ILocationRepository
    {
        IEnumerable<LocationDto> GetByRestaurantId(int restaurantId);
    }
}