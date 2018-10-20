using System.Collections.Generic;
using System.Linq;
using RestaurantPortal.Models;

namespace RestaurantPortal.Db.Repositories
{
    public class LocationRepository : ILocationRepository
    {
        private readonly ApplicationDbContext _context;
        public LocationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<LocationDto> GetByRestaurantId(int restaurantId)
        {
            var locations = _context.Locations.Where(l => l.RestaurantId == restaurantId);

            var locationDtos = locations.Select(l => new LocationDto
            {
                Id = l.LocationId,
                RestaurantId = l.RestaurantId,
                Address = l.Address,
                Latitude = l.Latitude,
                Longitude = l.Longitude
            });

            return locationDtos;
        }
    }
}