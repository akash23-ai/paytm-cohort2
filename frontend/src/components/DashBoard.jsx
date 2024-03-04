import React from "react";
import { Avatar, TextField } from "@mui/material";

function DashBoard() {
  return (
    <div className="h-full w-full text-lg font-bold">
      <nav className="p-4 flex justify-between items-center border-b border-solid border-gray-600">
        <h1 className="text-3xl font-bold ">Payment App</h1>
        <div className="flex justify-center items-center">
            <h2 className="text-lg font-medium mr-2">Hello, User</h2>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} sizes="20px"></Avatar>
        </div>
      </nav>
      <div className="mt-6 text-xl ml-6 h-full w-full">
       <h1> Your Balance $1000</h1>
       <h2 className="text-2xl mt-6 mb-4"> Users : </h2>
       <TextField id="outlined-basic" label="Search Users ..." variant="outlined" className="w-[90%]"/>
       <div className="flex flex-col mt-6">
        User 1
       </div>
      </div>
    </div>
  );
}

export default DashBoard;
