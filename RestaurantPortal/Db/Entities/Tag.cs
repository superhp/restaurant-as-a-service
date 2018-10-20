using System.Collections.Generic;

namespace RestaurantPortal.Db.Entities
{
    public class Tag
    {
        public int TagId { get; set; }
        public string Name { get; set; }

        public ICollection<RestaurantTag> RestaurantsTags { get; set; }
    }
}