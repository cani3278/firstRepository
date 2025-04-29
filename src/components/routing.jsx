import { Route, Routes } from "react-router-dom"
import { Login } from "./login"
import { NewUser } from "./newUser"
import { Home } from "./Home"
import { NewOrder } from "./newOrder"
import { OldOrders } from "./oldOrders"
import { ServicePage } from "./servicePage"
import { Manage } from "./manage"
import { ManageProducts } from "./manageProducts"
import { ManageCustomers } from "./manageCustomers"
import { ManageEmployees } from "./manageEmployees"


export const Routing = () => {

    return <>
        <Routes>
             <Route path="/login" element={<Login />}></Route>
            <Route path='/newUser' element={<NewUser />} />
            <Route path='/Home' element={<Home />} />
            <Route path='/newOrder' element={<NewOrder />} />
            <Route path='/Orders' element={<OldOrders />} />
            <Route path='/service' element={<ServicePage />} />
            <Route path='/Manage' element={<Manage />} />
            <Route path='/Manage/ManageProducts' element={<ManageProducts />} />
            <Route path='/Manage/ManageCustomers' element={<ManageCustomers />} />
            <Route path='/Manage/ManageEmployees' element={<ManageEmployees />} />
            <Route path="/" element={<Login />}/>
        </Routes>
    </>
}