using System.Collections;
using System.Collections.Generic;
using RestaurantPortal.Models;

namespace RestaurantPortal.Db.Repositories
{
    public interface IMenuRepository
    {
        IEnumerable<MenuItemDto> GetMenu(int restaurantId);
        MenuItemDto GetMenuItem(int itemId);
        int UpsertMenuItem(MenuItemDto menuItemDto);
        void DeleteMenuItem(int id);
    }
}