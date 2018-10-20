using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using RestaurantPortal.Db.Entities;
using RestaurantPortal.Models;

namespace RestaurantPortal.Db.Repositories
{
    public class RestaurantRepository : IRestaurantRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public RestaurantRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Update(RestaurantDto restaurantDto)
        {
            var restaurant = _dbContext.Restaurants.Find(restaurantDto.Id);

            if (restaurant == null)
                throw new ArgumentException($"No restaurant found with ID {restaurantDto.Id}");

            restaurant.Logo = restaurantDto.Logo;
            restaurant.MainColor = restaurantDto.MainColor;
            restaurant.SecondaryColor = restaurantDto.SecondaryColor;

            _dbContext.SaveChanges();
        }

        public RestaurantDto Get(int id)
        {
            var restaurant = _dbContext.Restaurants.Include(r => r.RestaurantTags).ThenInclude(t => t.Tag).Single(r => r.RestaurantId == id);

            if (restaurant == null)
                throw new ArgumentException($"No restaurant found with ID {id}");

            return ToDto(restaurant);
        }

        public IEnumerable<RestaurantDto> GetAll()
        {
            return _dbContext.Restaurants.Include(r => r.RestaurantTags).ThenInclude(t => t.Tag).Select(ToDto);
        }

        private RestaurantDto ToDto(Restaurant restaurant)
        {
            return new RestaurantDto
            {
                Id = restaurant.RestaurantId,
                Logo = restaurant.Logo,
                MainColor = restaurant.MainColor,
                SecondaryColor = restaurant.SecondaryColor,
                Name = restaurant.Name,
                Tags = restaurant.RestaurantTags.Select(r => r.Tag.Name)
            };
        }
    }
}