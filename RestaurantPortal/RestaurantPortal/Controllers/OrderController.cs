using Microsoft.AspNetCore.Mvc;

namespace RestaurantPortal.Controllers
{
    public class OrderController : Controller
    {
        [HttpPost]
        public int CreateOrder()
        {
            return 42;
        }

        [HttpGet]
        public void GetOrder(int id)
        {
            
        }

        [HttpGet]
        public void GetOrders(int id)
        {
            
        }
    }
}
