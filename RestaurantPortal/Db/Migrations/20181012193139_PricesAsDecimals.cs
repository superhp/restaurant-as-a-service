using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantPortal.Db.Migrations
{
    public partial class PricesAsDecimals : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "PaidPrice",
                table: "Orders",
                nullable: false,
                oldClrType: typeof(float));

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "MenuItems",
                nullable: false,
                oldClrType: typeof(float));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "PaidPrice",
                table: "Orders",
                nullable: false,
                oldClrType: typeof(decimal));

            migrationBuilder.AlterColumn<float>(
                name: "Price",
                table: "MenuItems",
                nullable: false,
                oldClrType: typeof(decimal));
        }
    }
}
