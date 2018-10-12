﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RestaurantPortal.Db;

namespace RestaurantPortal.Db.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20181012191544_AddOrdersToRestaurant")]
    partial class AddOrdersToRestaurant
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("RestaurantPortal.Db.Entities.MenuItem", b =>
                {
                    b.Property<int>("MenuItemId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Image");

                    b.Property<int>("MenuCategoryId");

                    b.Property<int?>("MenuItemCategoryId");

                    b.Property<string>("Name");

                    b.Property<float>("Price");

                    b.Property<int>("RestaurantId");

                    b.HasKey("MenuItemId");

                    b.HasIndex("MenuItemCategoryId");

                    b.HasIndex("RestaurantId");

                    b.ToTable("MenuItems");
                });

            modelBuilder.Entity("RestaurantPortal.Db.Entities.MenuItemCategory", b =>
                {
                    b.Property<int>("MenuItemCategoryId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("MenuItemCategoryId");

                    b.ToTable("MenuItemCategories");
                });

            modelBuilder.Entity("RestaurantPortal.Db.Entities.Order", b =>
                {
                    b.Property<int>("OrderId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CustomerId");

                    b.Property<int>("OrderStatus");

                    b.Property<float>("PaidPrice");

                    b.Property<int>("RestaurantId");

                    b.Property<string>("Table");

                    b.HasKey("OrderId");

                    b.HasIndex("RestaurantId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("RestaurantPortal.Db.Entities.OrderMenuItem", b =>
                {
                    b.Property<int>("OrderId");

                    b.Property<int>("MenuItemId");

                    b.Property<int>("OrderMenuItemId");

                    b.Property<int>("Quantity");

                    b.HasKey("OrderId", "MenuItemId");

                    b.HasIndex("MenuItemId");

                    b.ToTable("OrderMenuItems");
                });

            modelBuilder.Entity("RestaurantPortal.Db.Entities.Restaurant", b =>
                {
                    b.Property<int>("RestaurantId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("RestaurantId");

                    b.ToTable("Restaurants");
                });

            modelBuilder.Entity("RestaurantPortal.Db.Entities.MenuItem", b =>
                {
                    b.HasOne("RestaurantPortal.Db.Entities.MenuItemCategory", "MenuItemCategory")
                        .WithMany()
                        .HasForeignKey("MenuItemCategoryId");

                    b.HasOne("RestaurantPortal.Db.Entities.Restaurant", "Restaurant")
                        .WithMany()
                        .HasForeignKey("RestaurantId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RestaurantPortal.Db.Entities.Order", b =>
                {
                    b.HasOne("RestaurantPortal.Db.Entities.Restaurant", "Restaurant")
                        .WithMany("Orders")
                        .HasForeignKey("RestaurantId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("RestaurantPortal.Db.Entities.OrderMenuItem", b =>
                {
                    b.HasOne("RestaurantPortal.Db.Entities.MenuItem", "MenuItem")
                        .WithMany("Orders")
                        .HasForeignKey("MenuItemId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("RestaurantPortal.Db.Entities.Order", "Order")
                        .WithMany("PurchasedMenuItems")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
