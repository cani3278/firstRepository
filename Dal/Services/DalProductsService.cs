using Dal.Api;
using Dal.newModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    public class DalProductsService : IDalProducts
    {
        dbcontext dbcontext;
        public DalProductsService(dbcontext d)
        {
            dbcontext = d;
        }

        public List<ProductsSum> Add(ProductsSum product)
        {
            dbcontext.ProductsSums.Add(product);
            dbcontext.SaveChanges();
            return dbcontext.ProductsSums.ToList();
        }

        public List<ProductsSum> Get()
        {
            return dbcontext.ProductsSums.ToList();
        }

        public void Remove(int prod, int count)
        {
            List<ProductsSum> ls=Get();

          ls.Find(i => i.ProdId == prod);
          //  dbcontext.ProductsSums.Update();
        }

        public List<ProductsSum> Update(ProductsSum product)
        {
            throw new NotImplementedException();
        }
    }
}
