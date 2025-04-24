using BL.Api;
using BL.Models;
using Microsoft.AspNetCore.Mvc;

namespace CPC_PROJECT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        IBLProducts products;
        public ProductsController(IBL manager)
        {
            products = manager.Products;
        }
         [HttpGet("GetAll")]
        public List<BLProduct> Get()
        {
            return products.Get(); 
        }
        [HttpPost("Add")]
        public List<BLProduct> Add(BLProduct p)
        {
            return products.Add(p);
        }


    }
}
