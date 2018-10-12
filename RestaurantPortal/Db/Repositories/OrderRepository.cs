using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using RestaurantPortal.Db.Entities;
using RestaurantPortal.Models;

namespace RestaurantPortal.Db.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext _context;
        public OrderRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public int SaveOrder(OrderDto order)
        {
            var orderEntity = new Order
            {
                CustomerId = order.CustomerId,
                OrderStatus = (OrderStatusEnum) order.Status,
                RestaurantId = order.RestaurantId,
                PaidPrice = order.PaidPrice,
                Table = order.Table,
                PurchasedMenuItems = order.Items.Select(x => new OrderMenuItem
                    {
                        OrderId = order.OrderId,
                        MenuItemId = x.Id,
                        Quantity = x.Quantity
                    })
                    .ToList()
            };
            _context.Orders.Add(orderEntity);
            _context.SaveChanges();
            return orderEntity.OrderId;
        }

        public List<OrderDto> GetOrdersForRestaurant(int restaurantId, OrderStatus status)
        {
            var statusId = (OrderStatusEnum) status;
            var orders = _context.Orders
                .Where(x => x.RestaurantId == restaurantId)
                .Where(x => x.OrderStatus == statusId)
                .Include(x => x.PurchasedMenuItems)
                .ThenInclude(x => x.MenuItem)
                .ToList();
            return orders.Count != 0 ? orders.Select(x =>
            {
                return new OrderDto()
                {
                    OrderId = x.OrderId,
                    Table = x.Table,
                    Status = status,
                    Items = x.PurchasedMenuItems.Select(y => new MenuItemDto()
                    {
                        Name = y.MenuItem.Name,
                        Quantity = y.Quantity
                    }).ToList()
                };
            }).ToList() : new List<OrderDto>();
        }

        public void ChangeOrderStatus(int orderId, OrderStatus status)
        {
            var order = _context.Orders.Find(orderId);

            if (order == null)
                throw new ArgumentException($"No order with ID {orderId}");

            order.OrderStatus = (OrderStatusEnum) Enum.Parse(typeof(OrderStatusEnum), ((int)status).ToString());
            _context.SaveChanges();
        }
    }
}
