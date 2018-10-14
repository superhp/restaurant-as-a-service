using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantPortal.Db.Repositories;
using RestaurantPortal.Models;

namespace RestaurantPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantController : ControllerBase
    {
        private readonly IRestaurantRepository _restaurantRepository;

        public RestaurantController(IRestaurantRepository restaurantRepository)
        {
            _restaurantRepository = restaurantRepository;
        }

        [HttpGet]
        public IEnumerable<RestaurantDto> Get()
        {
            var restaurants = _restaurantRepository.GetAll();

            return restaurants;
        }

        [HttpGet("{id}")]
        public RestaurantDto Get(int id)
        {
            var restaurant = _restaurantRepository.Get(id);

            return restaurant;
        }

        [HttpPost]
        public void Update([FromBody] RestaurantDto restaurantDto)
        {
            _restaurantRepository.Update(restaurantDto);
        }
    }
}