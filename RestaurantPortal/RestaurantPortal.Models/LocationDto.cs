namespace RestaurantPortal.Models
{
    public class LocationDto
    {
        public int LocationId { get; set; }
        public int RestaurantId { get; set; }
        public string Address { get; set; }
    }
}