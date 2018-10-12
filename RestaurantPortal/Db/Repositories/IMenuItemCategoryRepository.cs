using System.Collections;
using System.Collections.Generic;
using RestaurantPortal.Models;

namespace RestaurantPortal.Db.Repositories
{
    public interface IMenuItemCategoryRepository
    {
        IEnumerable<MenuItemCategoryDto> GetAll();
    }
}