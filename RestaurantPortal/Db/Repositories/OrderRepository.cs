using System.Collections.Generic;
using System.Linq;
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
                        MenuItemId = x.Id,
                        Quantity = x.Quantity
                    })
                    .ToList()
            };
            _context.Orders.Add(orderEntity);
            _context.SaveChanges();
            return orderEntity.OrderId;
        }
    }
}
