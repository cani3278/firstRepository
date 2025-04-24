using BL.Api;
using BL.Models;
using Dal.Api;
using Dal.newModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public class BLProductService : IBLProducts
    {
        IDal dal;
        public BLProductService(IDal dal)
        {
            this.dal = dal;
        }

        public List<BLProduct> Add(BLProduct product)
        {
            ProductsSum DalProduct = new ProductsSum()
            {
                 ProdId =product.ProdId,
                Pname=product.Pname,
                Psum =product.Psum, 
                Pimporter =product.Pimporter,
                Pcompany=product.Pcompany,
                Pdescription=product.Pdescription,
                Ppicture=product.Ppicture
            };
            dal.Products.Add(DalProduct);
            return Get();
        }

        public List<BLProduct> Get()
        {
            List<BLProduct> list = new();
            foreach (var item in dal.Products.Get())
            {
                list.Add(new BLProduct(item));
            }
            return list;
        }

        public void Remove(int prod, int count)
        {
            throw new NotImplementedException();
        }

        public List<BLProduct> Update(BLProduct product)
        {
            throw new NotImplementedException();
        }
    }
}
