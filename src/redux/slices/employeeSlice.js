import { createSlice } from "@reduxjs/toolkit";
import { getEmployeesThunk } from "./getEmployeesThunk";

export const INITAIL_STATE_EMPLOYEES = {
   employees:[]
}
export const employeesSlice = createSlice({
    name: 'Employees',
    initialState: INITAIL_STATE_EMPLOYEES,
    reducers: {
        
    },
    extraReducers: (builder) => {

      
        builder.addCase(getEmployeesThunk.fulfilled, (state, action) => {
            console.log("get emps succeed");
            state.employees = action.payload;   
            
        });
       
        builder.addCase(getEmployeesThunk.rejected, (state, action) => {
            console.log("action: ", action);
        });
        
       
    }
});