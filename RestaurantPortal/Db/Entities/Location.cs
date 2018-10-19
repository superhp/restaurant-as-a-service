using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantPortal.Db.Entities
{
    public class Location
    {
        public int LocationId { get; set; }

        public int RestaurantId { get; set; }
        [ForeignKey("RestaurantId")]
        public virtual Restaurant Restaurant { get; set; }

        public string Address { get; set; }
    }
}