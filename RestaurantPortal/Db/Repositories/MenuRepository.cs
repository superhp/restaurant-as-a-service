using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RestaurantPortal.Models;

namespace RestaurantPortal.Db.Repositories
{
    public class MenuRepository : IMenuRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public MenuRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<MenuItemDto> GetMenu(int restaurantId)
        {
            var menu = _dbContext.MenuItems.Where(m => m.RestaurantId == restaurantId).ToList().Select(m => new MenuItemDto
            {
                MenuItemId = m.MenuItemId,
                Image = m.Image,
                CategoryId = m.MenuItemCategoryId,
                Name = m.Name,
                Price = m.Price
            });

            return menu;
        }
    }
}
