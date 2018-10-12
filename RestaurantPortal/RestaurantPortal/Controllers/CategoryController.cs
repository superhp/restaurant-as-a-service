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
    public class CategoryController : ControllerBase
    {
        private readonly IMenuItemCategoryRepository _menuItemCategoryRepository;

        public CategoryController(IMenuItemCategoryRepository menuItemCategoryRepository)
        {
            _menuItemCategoryRepository = menuItemCategoryRepository;
        }

        [HttpGet("")]
        public IEnumerable<MenuItemCategoryDto> Get()
        {
            var categories = _menuItemCategoryRepository.GetAll();

            return categories;
        }
    }
}