using BL.Models;
using Dal.newModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
 public   interface IBLProducts
    {
        List<BLProduct> Get();
        void Remove(int prod, int count);
        List<BLProduct> Add(BLProduct product);
        List<BLProduct> Update(BLProduct product);
    }
}
