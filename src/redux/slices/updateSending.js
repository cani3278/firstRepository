import { createAsyncThunk } from "@reduxjs/toolkit";

export const UpdateSendingThunk = createAsyncThunk(
    'UpdateSending', 
    async (orderid) => {
         const res = await fetch(`https://localhost:7064/api/Orders/updateSending/${orderid}`, {
        method: 'PUT',
      //  body: JSON.stringify(details),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.ok) {
        const data = await res.json();
        console.log("UpdateSending success");
        return data;
    }
    else {
        console.log("failed to fetch😒");
        throw new Error('failed to fetch😒');
    }
    }
)