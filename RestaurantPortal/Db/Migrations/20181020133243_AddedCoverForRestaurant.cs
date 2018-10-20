using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantPortal.Db.Migrations
{
    public partial class AddedCoverForRestaurant : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Cover",
                table: "Restaurants",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cover",
                table: "Restaurants");
        }
    }
}
