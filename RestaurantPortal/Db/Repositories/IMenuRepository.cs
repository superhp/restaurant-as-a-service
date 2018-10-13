﻿using System.Collections;
using System.Collections.Generic;
using RestaurantPortal.Models;

namespace RestaurantPortal.Db.Repositories
{
    public interface IMenuRepository
    {
        IEnumerable<MenuItemDto> GetMenu(int restaurantId);
        MenuItemDto GetMenuItem(int itemId);
        void UpsertMenuItem(MenuItemDto menuItemDto);
    }
}