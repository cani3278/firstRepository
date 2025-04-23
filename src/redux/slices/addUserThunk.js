import { createAsyncThunk } from "@reduxjs/toolkit";

export const addUserThunk = createAsyncThunk(
    'logOn', 
    async (details) => { console.log("logon");
    let res;
    console.log(details.custName);
    if(details.custName.substring(0,3)==="emp"){
      console.log(details.custName.substring(3));
     var newDetails= {
       empId:details.custId,
       eName: details.custName.substring(3),
        empNum:0,
        eGmail:details.custEmail,
        ephone:details.custPhone
    }
    // {
    //     "empId":333333,
    //     "empNum": 0,
    //     "ename": "Tuty",
    //     "egmail": "ttt",
    //     "ephone": "026505665"
    //   }
   
          res = await fetch('https://localhost:7064/api/Employee/logOn', {//https://localhost:7064/api/Employee/logOn
        method: 'POST',
        body: JSON.stringify(newDetails),
        headers: {
            'Content-Type': 'application/json'
        }
    })}    
       
    else res = await fetch('https://localhost:7064/api/Employee/logOn', {
        method: 'POST',
        body: JSON.stringify(details),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (res.ok) {
        const data = await res.json();
        console.log("fetch");
        return data;
        //return true;

    }
    else {
        console.log("failed to fetch😒");
        throw new Error('failed to fetch😒');
    }
    }
)
