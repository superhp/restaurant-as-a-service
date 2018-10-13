﻿using System;
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
            var restaurant = _dbContext.Restaurants.Find(id);

            if (restaurant == null)
                throw new ArgumentException($"No restaurant found with ID {id}");

            return new RestaurantDto
            {
                Id = restaurant.RestaurantId,
                Logo = restaurant.Logo,
                MainColor = restaurant.MainColor,
                SecondaryColor = restaurant.SecondaryColor,
                Name = restaurant.Name
            };
        }
    }
}