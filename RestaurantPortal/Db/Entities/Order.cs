using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantPortal.Db.Entities
{
    public class Order
    {
        public int OrderId { get; set; }

        public int MenuCategoryId { get; set; }
        [ForeignKey("MenuItemCategoryId")]
        public MenuItemCategory MenuItemCategory { get; set; }

        public int CustomerId { get; set; }
        public float PaidPrice { get; set; }
        public string Table { get; set; }

        public ICollection<OrderMenuItem> PurchasedMenuItems { get; set; }
        public OrderStatusEnum OrderStatus { get; set; }
    }
}