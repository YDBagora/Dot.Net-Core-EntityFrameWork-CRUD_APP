using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ResturantApp.Data;
using ResturantApp.Module.Entitys;
using ResturantApp.Modules;
using System.Net.NetworkInformation;

namespace ResturantApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;
        private Order OrderItems;

        public UserController(ApplicationDbContext dbContext) 
        {
            this.dbContext = dbContext;
        }

        [HttpGet("getAllItems")]
        public async Task<IActionResult> GetAllItems()
        {
            var items = await dbContext.Items.ToListAsync();

            if(items == null || !items.Any())
            {
                return NotFound("Their is no item founded");
            }

            await dbContext.SaveChangesAsync();

            return Ok(items);
        }

        [HttpGet("getAllCustomer")]
        public async Task<IActionResult> getAllCustomers() 
        {
            var user = await dbContext.Customers.ToListAsync();

            if(user == null || !user.Any())
            {
                return NotFound("No Customer founded");
            }

            await dbContext.SaveChangesAsync();

            return Ok(user);
        }

        [HttpGet("getAllOrders")]
        public async Task<IActionResult> GetAllOrderNo()
        {
            var orderNo = await dbContext.Orders.Include(o => o.Customers).Include(o => o.OrderItems).ToListAsync();

            if(orderNo == null || !orderNo.Any())
            {
                return NotFound("No Order is placed yet");
            }

            var result = orderNo.Select(order => new
            {
                order.OrderNo,
                order.GTotal,
                order.PayMethod,
                order.CreateDate,
                order.CustomerID,
                CustomerName = dbContext.Customers.Where(c => c.Id == order.CustomerID).Select(c => c.Name).FirstOrDefault(),
                order.OrderItems
            });

            await dbContext.SaveChangesAsync();

            return Ok(result);
        }

        [HttpPost("orderDetails")]
        public async Task<IActionResult> CreateOrder([FromBody] OrderDto orderDto)
        {
            var order = new Order
            {
                Id = orderDto.Id,
                OrderNo = orderDto.OrderNo,
                CustomerID = orderDto.CustomerID,
                PayMethod = orderDto.PayMethod,
                GTotal = orderDto.GTotal,
                IsActive = true,
                IsDelete = false,
                CreateDate = DateTime.UtcNow,
                UpdateDate = DateTime.UtcNow,
                Customers = orderDto.Customers.Select(d => new Customer
                {
                    Name = d.Name,
                }).ToList(),
                OrderItems = orderDto.OrderItems.Select(item => new OrderItem
                {
                    Id = item.Id,
                    OrderID = orderDto.Id,
                    ItemID = item.ItemID,
                    Quantity = item.Quantity,
                    IsActive = true,
                    IsDelete = false,
                    CreateDate = DateTime.UtcNow,
                    UpdateDate = DateTime.UtcNow
                }).ToList()
            };

            dbContext.Orders.Add(order);
            await dbContext.SaveChangesAsync();
            return Ok(order);
        }

        [HttpGet("getOrderById/{id}")]
        public async Task<IActionResult> GetOrderById(Guid id)
        {
            //if (!Guid.TryParse(id, out Guid orderGuid))
            //    return BadRequest("Invalid Order ID");

            var order = (from a in dbContext.Orders
                         where a.Id == id
                         select new
                         {
                             a.Id,
                             a.OrderNo,
                             a.CustomerID,
                             a.PayMethod,
                             a.GTotal,
                             a.IsActive,
                             a.IsDelete,
                             a.CreateDate,
                             a.UpdateDate
                         }).FirstOrDefault();

            if (order == null)
                return NotFound("Order not found.");

            var orderDetails = (from a in dbContext.OrderItems
                                join b in dbContext.Items on a.ItemID equals b.Id
                                where a.OrderID == id
                                select new
                                {
                                    a.Id,
                                    a.ItemID,
                                    Name = b.Name,
                                    b.Price,
                                    a.Quantity,
                                    b.IsActive,
                                    b.IsDelete,
                                    a.CreateDate,
                                    a.UpdateDate,
                                    GTotal = a.Quantity * b.Price
                                }).ToList();

            return Ok(new { order, orderDetails });
        }


    }
}


