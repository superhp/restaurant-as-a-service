using System;
using System.Collections.Generic;
using System.Text;

namespace RestaurantPortal.Db.Entities
{
    public class Restaurant
    {
        public int RestaurantId { get; set; }
        public string Name { get; set; }
        public string Logo { get; set; }
        public string MainColor { get; set; }

        public ICollection<Order> Orders { get; set; }
    }
}
