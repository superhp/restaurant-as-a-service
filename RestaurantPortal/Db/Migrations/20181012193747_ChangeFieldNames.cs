using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantPortal.Db.Migrations
{
    public partial class ChangeFieldNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenuItems_MenuItemCategories_MenuItemCategoryId",
                table: "MenuItems");

            migrationBuilder.DropColumn(
                name: "MenuCategoryId",
                table: "MenuItems");

            migrationBuilder.AlterColumn<double>(
                name: "Price",
                table: "MenuItems",
                nullable: false,
                oldClrType: typeof(float));

            migrationBuilder.AlterColumn<int>(
                name: "MenuItemCategoryId",
                table: "MenuItems",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_MenuItems_MenuItemCategories_MenuItemCategoryId",
                table: "MenuItems",
                column: "MenuItemCategoryId",
                principalTable: "MenuItemCategories",
                principalColumn: "MenuItemCategoryId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenuItems_MenuItemCategories_MenuItemCategoryId",
                table: "MenuItems");

            migrationBuilder.AlterColumn<float>(
                name: "Price",
                table: "MenuItems",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<int>(
                name: "MenuItemCategoryId",
                table: "MenuItems",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "MenuCategoryId",
                table: "MenuItems",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_MenuItems_MenuItemCategories_MenuItemCategoryId",
                table: "MenuItems",
                column: "MenuItemCategoryId",
                principalTable: "MenuItemCategories",
                principalColumn: "MenuItemCategoryId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
