using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantPortal.Db.Migrations
{
    public partial class AddBrandingColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Logo",
                table: "Restaurants",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MainColor",
                table: "Restaurants",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Logo",
                table: "Restaurants");

            migrationBuilder.DropColumn(
                name: "MainColor",
                table: "Restaurants");
        }
    }
}
