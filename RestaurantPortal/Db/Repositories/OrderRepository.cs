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
                        MenuItemId = x.MenuItemId,
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
            return orders.Count != 0 ? FormOrderList(orders) : new List<OrderDto>();
        }

        public List<OrderDto> GetOrdersForCustomer(int customerId, OrderStatus status)
        {
            var statusId = (OrderStatusEnum)status;
            var orders = _context.Orders
                .Where(x => x.RestaurantId == customerId)
                .Where(x => x.OrderStatus == statusId)
                .Include(x => x.PurchasedMenuItems)
                .ThenInclude(x => x.MenuItem)
                .ToList();
            return orders.Count != 0 ? FormOrderList(orders) : new List<OrderDto>();
        }

        public List<OrderDto> GetOrdersForCustomer(int customerId)
        {
            var orders = _context.Orders
                .Where(x => x.RestaurantId == customerId)
                .Include(x => x.PurchasedMenuItems)
                .ThenInclude(x => x.MenuItem)
                .ToList();
            return orders.Count != 0 ? FormOrderList(orders) : new List<OrderDto>();
        }

        private List<OrderDto> FormOrderList(List<Order> orders)
        {
            return orders.Select(x =>
                {
                    return new OrderDto()
                    {
                        OrderId = x.OrderId,
                        Table = x.Table,
                        Status = (OrderStatus) x.OrderStatus,
                        CustomerId = x.CustomerId,
                        RestaurantId = x.RestaurantId,
                        PaidPrice = x.PaidPrice,
                        Items = x.PurchasedMenuItems.Select(y => new MenuItemDto()
                            {
                                MenuItemId = y.MenuItemId,
                                Image = y.MenuItem.Image,
                                Price = y.MenuItem.Price,
                                CategoryId = y.MenuItem.MenuItemCategoryId,
                                Name = y.MenuItem.Name,
                                Quantity = y.Quantity
                            })
                            .ToList()
                    };
                })
                .ToList();
        }

        public void ChangeOrderStatus(int orderId, OrderStatus status)
        {
            var order = _context.Orders.Find(orderId);

            if (order == null)
                throw new ArgumentException($"No order with ID {orderId}");

            order.OrderStatus = (OrderStatusEnum)status;
            _context.SaveChanges();
        }

        public OrderDto GetOrder(int id)
        {
            var order =
                _context.Orders.Include(o => o.PurchasedMenuItems).ThenInclude(p => p.MenuItem)
                    .Include(o => o.Restaurant)
                    .Single(o => o.OrderId == id);

            return new OrderDto
            {
                CustomerId = order.CustomerId,
                Items = order.PurchasedMenuItems.Select(i => new MenuItemDto
                {
                    CategoryId = i.MenuItem.MenuItemCategoryId,
                    Image = i.MenuItem.Image,
                    MenuItemId = i.MenuItemId,
                    Name = i.MenuItem.Name,
                    Price = i.MenuItem.Price,
                    Quantity = i.Quantity

                }).ToList(),
                OrderId = order.OrderId,
                PaidPrice = order.PaidPrice,
                RestaurantId = order.RestaurantId,
                Status = (OrderStatus)order.OrderStatus,
                Table = order.Table
            };
        }

        public void UpdateOrderAmount(int orderId, decimal amount)
        {
            var order = _context.Orders.Find(orderId);

            order.PaidPrice = amount;
            _context.SaveChanges();
        }
    }
}
