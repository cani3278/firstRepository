import { createAsyncThunk } from "@reduxjs/toolkit";

export const assignOrdersToEmpThunk = createAsyncThunk(
    'assignOrdersToEmpThunk', 
    async ({empID,orderIds}) => {
      console.log("assignedOrders");
        console.log(empID);
        const res = await fetch(`https://localhost:7064/api/Orders/AssignOrders/${empID}`, {
        method: 'PUT',
        body: JSON.stringify(orderIds),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.ok) {
        console.log("assignOrders success");
       
    }
    else {
        console.log("failed to fetch😒");
        throw new Error('failed to fetch😒');
    }
    }
)