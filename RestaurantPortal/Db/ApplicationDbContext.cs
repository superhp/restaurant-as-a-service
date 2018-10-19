using Microsoft.EntityFrameworkCore;
using RestaurantPortal.Db.Entities;

namespace RestaurantPortal.Db
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<MenuItem> MenuItems { get; set; }
        public DbSet<MenuItemCategory> MenuItemCategories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderMenuItem> OrderMenuItems { get; set; }
        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<Location> Locations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderMenuItem>()
                .HasKey(bc => new { bc.OrderId, bc.MenuItemId });

            modelBuilder.Entity<OrderMenuItem>()
                .HasOne(bc => bc.Order)
                .WithMany(b => b.PurchasedMenuItems)
                .HasForeignKey(bc => bc.OrderId);

            modelBuilder.Entity<OrderMenuItem>()
                .HasOne(bc => bc.MenuItem)
                .WithMany(c => c.Orders)
                .HasForeignKey(bc => bc.MenuItemId);

            modelBuilder
            .Entity<Order>()
            .HasOne<Restaurant>(e => e.Restaurant)
            .WithMany(e => e.Orders)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder
            .Entity<Location>()
            .HasOne<Restaurant>(e => e.Restaurant)
            .WithMany(e => e.Locations)
            .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
