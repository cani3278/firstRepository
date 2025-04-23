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
    public class BLCustomerService : IBLCustomer
    {
        IDal dal;
        public BLCustomerService(IDal dal)
        {
            this.dal = dal;
        }
        public BLCustomer? Create(BLCustomer newBlCustomer )
        {

            Customer c = new()
            {
                CustId = newBlCustomer.CustId,
                CustAddress = newBlCustomer.CustAddress,
                //CustNum = item.CustNum,
                CustEmail = newBlCustomer.CustEmail,
                CustName = newBlCustomer.CustName,
                CustPhone = newBlCustomer.CustPhone
            };
            dal.Customers.Create(c);  
            return new BLCustomer( dal.Customers.Get().Find(item => item.CustId == newBlCustomer.CustId));

        }

        public List<BLCustomer> Get()
        {
            List<BLCustomer> list = new();
            foreach (var item in dal.Customers.Get())
            {
                list.Add(new BLCustomer(item));
            }
            return list;
        }
       

        public BLCustomer GetById(int id)
        {
           List<BLCustomer> l=Get();
         return   l.Find(item => item.CustId == id);
            //List<BLCustomer> list = customers.Get();
            //foreach (var item in customers.Get())
            //{
            //    if (item.CustId == id)
            //        return id;
            //}
            //return -1;
        }
    }
}
