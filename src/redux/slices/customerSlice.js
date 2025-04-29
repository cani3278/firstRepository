import { createSlice } from "@reduxjs/toolkit";
import { logInThunk } from "./logInThunk";
import { addCustomerThunk } from "./addCustomerThunk";

export const INITAIL_STATE_CUSTOMER = {
    customername: "",
    password: "",
    CID: -1,
    EID: -1,
    sucsses: false,
    failed: false,
    custDetails:
    {
       custId: 0,
       custName: "",
       custAddress: "",
       custEmail: "",
       custPhone: "",
       orders: [{
            OrderId: 0,
            OrdersDetais: "",
           // OrderDate: new Date(),
            CustId: 0,
            EmpId: 0
        }]
    }
}
export const CustomerSlice = createSlice({
    name: 'customer',
    initialState: INITAIL_STATE_CUSTOMER,
    reducers: {
        
        editcustomername: (state, action) => {
            state.customername = action.payload;
        },
        editPassword: (state, action) => {
            state.password = action.payload;
        },
        editCID: (state, action) => {
            state.CID = action.payload;
        }
    },
    extraReducers: (builder) => {

        // הוספת מקרה שהט'נק התחיל
        builder.addCase(logInThunk.pending, (state) => {
        });
        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(logInThunk.fulfilled, (state, action) => {
             state.custDetails = action.payload;
            if(state.custDetails.custId){
                state.CID = state.custDetails.custId;
            }
            if(state.custDetails.empId){
                state.EID = state.custDetails.empId;
            }
             state.sucsses = true;
        });
        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(logInThunk.rejected, (state, action) => {
            state.failed = true;
            console.log("action: ", action);
        });
        // הוספת מקרה שהט'נק התחיל
        builder.addCase(addCustomerThunk.pending, (state) => {
        });
        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(addCustomerThunk.fulfilled, (state, action) => {
            state.custDetails = action.payload;
            if(state.custDetails.custId){
                state.CID = state.custDetails.custId;
            }
            if(state.custDetails.empId){
                state.EID = state.custDetails.empId;
            }
             state.sucsses = true;
        });
        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(addCustomerThunk.rejected, (state, action) => {
            state.CID = -2;
            console.log("action: ", action);
        });


    }
});

export const { editcustomername, editPassword, editCID } = CustomerSlice.actions;