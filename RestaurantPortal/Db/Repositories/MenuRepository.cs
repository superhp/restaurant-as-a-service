using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RestaurantPortal.Db.Entities;
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

        public void UpsertMenuItem(MenuItemDto menuItemDto)
        {
            var menuItem = new MenuItem
            {
                MenuItemId = menuItemDto.MenuItemId,
                Image = menuItemDto.Image,
                MenuItemCategoryId = menuItemDto.CategoryId,
                Name = menuItemDto.Name,
                RestaurantId = menuItemDto.RestaurantId,
                Price = menuItemDto.Price,
            };

            if (menuItemDto.MenuItemId == 0)
            {
                _dbContext.MenuItems.Add(menuItem);
            }
            else
            {
                _dbContext.MenuItems.Update(menuItem);
            }

            _dbContext.SaveChanges();
        }

        public IEnumerable<MenuItemDto> GetMenu(int restaurantId)
        {
            var menu = _dbContext.MenuItems.Where(m => m.RestaurantId == restaurantId).ToList().Select(ToMenuItemDto);

            return menu;
        }

        public MenuItemDto GetMenuItem(int itemId)
        {
            var menuItem = _dbContext.MenuItems.Find(itemId);

            return ToMenuItemDto(menuItem);
        }

        private MenuItemDto ToMenuItemDto(MenuItem m)
        {
            return new MenuItemDto
            {
                MenuItemId = m.MenuItemId,
                RestaurantId = m.RestaurantId,
                Image = m.Image,
                CategoryId = m.MenuItemCategoryId,
                Name = m.Name,
                Price = m.Price
            };
        }
    }
}
