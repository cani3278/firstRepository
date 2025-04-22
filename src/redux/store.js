import { combineSlices, configureStore } from "@reduxjs/toolkit";
import {userSlice } from "./slices/userSlice";
import { productsSlice } from "./slices/productsSlice";
import { ordersSlice } from "./slices/ordersSlice";


const reducers = combineSlices(userSlice,productsSlice,ordersSlice);


export const STORE = configureStore({
    reducer: reducers,

})