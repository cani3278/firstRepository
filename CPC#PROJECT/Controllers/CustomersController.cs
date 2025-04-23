using BL.Api;
using BL.Models;
using Dal.Api;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

namespace CPC_PROJECT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController:ControllerBase
    {
        IBLCustomer customers;// = new BlPatientService();
        public CustomerController(IBL manager)
        {
            customers = manager.Customers;// כאן קבלנו אוביקט שהוא שרות של פצינטים
        }
        // להחזיר רשימת לקוחות
        [HttpGet("GetAll")]
        public List<BLCustomer> Get()
        {
            return customers.Get(); //new List<string>() { "sara", "shira", "bracha" };  
        }
        //logIn
        [HttpGet("logIn/{id}/{name}")]
        public BLCustomer logIn(int id,string name)
        {
            BLCustomer a= customers.GetById(id);
            if (a?.CustName == name)
                return a;
            else return null;
        }
        //logOn
        [HttpPost("logOn")]
        public IActionResult create([FromBody]BLCustomer newCustomer)
        {
          return Ok( customers.Create(newCustomer));
         //   return customers.GetById(newCustomer.CustId);

        }

    }
}
