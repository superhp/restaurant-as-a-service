using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantPortal.Db.Entities
{
    public class MenuItem
    {
        public int MenuItemId { get; set; }

        public int RestaurantId { get; set; }
        [ForeignKey("RestaurantId")]
        public virtual Restaurant Restaurant { get; set; }

        public int MenuCategoryId { get; set; }
        [ForeignKey("MenuItemCategoryId")]
        public virtual MenuItemCategory MenuItemCategory { get; set; }

        public string Name { get; set; }
        public float Price { get; set; }
        public string Image { get; set; }

        public ICollection<OrderMenuItem> Orders { get; set; }

    }
}