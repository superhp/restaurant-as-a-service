namespace RestaurantPortal.Models
{
    public class LocationDto
    {
        public int Id { get; set; }
        public int RestaurantId { get; set; }
        public string Address { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
    }
}