using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantPortal.Db.Migrations
{
    public partial class AddOrdersToRestaurant : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_MenuItemCategories_MenuItemCategoryId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_MenuItemCategoryId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "MenuItemCategoryId",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "MenuCategoryId",
                table: "Orders",
                newName: "RestaurantId");

            migrationBuilder.AddColumn<int>(
                name: "OrderMenuItemId",
                table: "OrderMenuItems",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_RestaurantId",
                table: "Orders",
                column: "RestaurantId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Restaurants_RestaurantId",
                table: "Orders",
                column: "RestaurantId",
                principalTable: "Restaurants",
                principalColumn: "RestaurantId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Restaurants_RestaurantId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_RestaurantId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "OrderMenuItemId",
                table: "OrderMenuItems");

            migrationBuilder.RenameColumn(
                name: "RestaurantId",
                table: "Orders",
                newName: "MenuCategoryId");

            migrationBuilder.AddColumn<int>(
                name: "MenuItemCategoryId",
                table: "Orders",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_MenuItemCategoryId",
                table: "Orders",
                column: "MenuItemCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_MenuItemCategories_MenuItemCategoryId",
                table: "Orders",
                column: "MenuItemCategoryId",
                principalTable: "MenuItemCategories",
                principalColumn: "MenuItemCategoryId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
