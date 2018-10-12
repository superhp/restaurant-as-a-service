namespace RestaurantPortal.Models
{
    public class MenuItemDto
    {
        public int MenuItemId { get; set; }
        public int MenuItemCategoryId { get; set; }

        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; }
    }
}
