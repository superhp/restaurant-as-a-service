namespace RestaurantPortal.Models
{
    public class MenuItemDto
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }

        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; }
        public int Quantity { get; set; }
    }
}
