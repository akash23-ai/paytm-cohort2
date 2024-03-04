import React from "react";
import { Avatar, TextField, Button } from "@mui/material";


function SendMoney() {
  return (
    <div className="h-1/2 w-[35%] shadow-2xl border border-dotted p-4 drop-shadow-lg rounded-md">
      <h1 className="mt-4 text-4xl font-bold flex flex-col  items-center">
        Send Money
      </h1>

      <div className="flex flex-col justify-center h-[85%] w-full p-4">
        <div className="flex items-center">
          <Avatar
            sx={{ m: 1, bgcolor: "secondary.main" }}
            sizes="20px"
          ></Avatar>
          <h1 className="text-2xl font-bold">Friends Name</h1>
        </div>
        <div className="p-2">
          <h1 className="text-xl font-bold mb-3">Amount (in Rs)</h1>
          <TextField id="outlined-basic" label="Amount" variant="outlined" className="w-full" sx={{marginBottom : "1rem"}}/>
          <Button variant="contained" className="w-full" sx={{paddingY:"wrem"}}>Send Money</Button>
        </div>

        
      </div>
    </div>
  );
}

export default SendMoney;
