using BL.Api;
using BL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

namespace CPC_PROJECT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController:ControllerBase
    {
        IBLEmployee Employees;// = new BlPatientService();
        public EmployeeController(IBL manager)
        {
            Employees = manager.Employees;
        }
        // להחזיר רשימת לקוחות
        [HttpGet("GetAll")]
        public IActionResult Get()
        {
            return Ok(Employees.Get()); 
        }
        //logIn
        [HttpGet("logIn/{id}/{name}")]
        public BLEmployee logIn(int id, string name)
        {
            BLEmployee a = Employees.GetById(id);
            if (a.Ename == name)
                return a;
            else return null;
        }
        //logOn
        [HttpPost("logOn")]
        public BLEmployee create([FromBody] BLEmployee newEmp)
        {
            Employees.Create(newEmp);
            return Employees.GetById(newEmp.EmpId);

        }

    }
}
