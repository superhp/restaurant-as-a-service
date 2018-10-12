using System.Collections.Generic;
using System.Linq;
using RestaurantPortal.Models;

namespace RestaurantPortal.Db.Repositories
{
    public class MenuItemCategoryRepository : IMenuItemCategoryRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public MenuItemCategoryRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<MenuItemCategoryDto> GetAll()
        {
            var categories = _dbContext.MenuItemCategories.Select(c => new MenuItemCategoryDto
            {
                Id = c.MenuItemCategoryId,
                Name = c.Name
            });

            return categories;
        }
    }
}