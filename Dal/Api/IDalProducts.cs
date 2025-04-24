using Dal.newModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
  public  interface IDalProducts
    {

        List<ProductsSum> Get();
        void Remove(int prod, int count);
        List<ProductsSum> Add(ProductsSum product);
        List<ProductsSum> Update(ProductsSum product);

    }
}
