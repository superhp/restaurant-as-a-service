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
    public class MenuController : ControllerBase
    {
        private readonly IMenuRepository _menuRepository;

        public MenuController(IMenuRepository menuRepository)
        {
            _menuRepository = menuRepository;
        }

        [HttpGet("{restaurantId}")]
        public IEnumerable<MenuItemDto> Get(int restaurantId)
        {
            var menu = _menuRepository.GetMenu(restaurantId);

            return menu;
        }

        [HttpGet("item/{itemId}")]
        public MenuItemDto GetMenuItem(int itemId)
        {
            var menuItem = _menuRepository.GetMenuItem(itemId);

            return menuItem;
        }

        [HttpPost("save")]
        public int Save([FromBody] MenuItemDto menuItem)
        {
            var id = _menuRepository.UpsertMenuItem(menuItem);

            return id;
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _menuRepository.DeleteMenuItem(id);
        }
    }
}