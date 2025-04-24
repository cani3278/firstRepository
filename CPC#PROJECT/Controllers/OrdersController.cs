using BL.Api;
using BL.Models;
using Microsoft.AspNetCore.Mvc;

namespace CPC_PROJECT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController:ControllerBase
    {
        IBLOrders orders;// = new BlPatientService();
        public OrdersController(IBL manager)
        {
            orders = manager.Orders;// כאן קבלנו אוביקט שהוא שרות של פצינטים
        }
        // להחזיר רשימת כל ההזמנות
        [HttpGet("GetAll")]
        public List<BLOrder> Get()
        {
            return orders.Get(); //new List<string>() { "sara", "shira", "bracha" };  
        }
        // להחזיר רשימת כל ההזמנות
        [HttpDelete("DeleteAll")]
        public void delete()
        {
             orders.deleteAll(); //new List<string>() { "sara", "shira", "bracha" };  
        }
        // להחזיר רשימת כל ההזמנות
        [HttpGet("GetByCustomer/{id}")]
        public IActionResult GetByCustomer(int id)
        {
            return Ok( orders.GetForCustomer(id)); 
        }
        [HttpGet("GetByEmployee/{id}")]
        public IActionResult GetByemp(int id)
        {
            return Ok(orders.GetForEmployee(id));
        }
        //add
        [HttpPost("addToCustomer/{id}")]
        public List<BLOrder> add(int id, [FromBody] List<BLOrderDetail> list)
        {
            int a = orders.Add(id);
            return orders.addDetails(list, a);

        }
//public IActionResult add(int id, [FromBody]List<BLOrderDetail>list)
        //{
        //  int a=orders.Add(id);
        //  return Ok(orders.addDetails(list,a));

        //}






    }
}
