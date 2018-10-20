using System.Collections;
using System.Collections.Generic;

namespace RestaurantPortal.Models
{
    public class RestaurantDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Logo { get; set; }
        public string MainColor { get; set; }
        public string SecondaryColor { get; set; }
        public IEnumerable<string> Tags { get; set; }
    }
}