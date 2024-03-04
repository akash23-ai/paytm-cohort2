import React, { useEffect, useState } from "react";
import { Avatar, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DashBoard({token}) {
  const [user, setUser] = useState('')
  const [account, setAccount] = useState('')
  const [search, setSearch] = useState('')
  const [usersData, setUsersData] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if(!token){
      token = localStorage.getItem("token")
      if(!token) {
        navigate("/signup")
      }
    }

   
    console.log(token)
    const fetchUser = async () => {
      const response = await fetch('http://localhost:3000/api/v1/user/login', {
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`
        }
      })
      const data = await response.json()
      setUser(data)
      console.log("Hello")
    }

    const fetchAccount = async () => {
      const response = await fetch('http://localhost:3000/api/v1/account/balance', {
        method : "GET",
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`
        }
      })

      const data = await response.json()
      setAccount(data)

    }

    fetchUser()
    fetchAccount()

   
  }, [])
  console.log(user)

  const handleChange = async(e) => {
    setSearch(e.target.value)

    const response = await fetch('http://localhost:3000/api/v1/user/bulk', {
      method : "GET",
      headers : {
        "Content-Type" : "application/json"
      }
    })

    const bulkData = await response.json();
    console.log(bulkData.user)
    setUsersData(bulkData.user)

  }

  const sendMoneyTo = async(user, index) => {
    console.log(user)
   const response = await fetch(`http://localhost:3000/api/v1/account/transfer`, {
      method : "POST", 
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body : JSON.stringify({
        amount : 100,
        to : user.username
      
      })

   })

   const balance = await fetch('http://localhost:3000/api/v1/account/balance', {
      method : "GET",
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      }
   })
   const responsbalance = await balance.json()

   setAccount(responsbalance)


  }



  if(!user) return <h1>Loading...</h1>
  return (
    <div className="h-full w-[95%] text-lg font-bold">
      <nav className="p-4 flex justify-between items-center border-b border-solid border-gray-600">
        <h1 className="text-3xl font-bold ">Payment App</h1>
        <div className="flex justify-center items-center">
            <h2 className="text-lg font-medium mr-2">Hello, {user.user.firstName}</h2>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} sizes="20px"></Avatar>
        </div>
      </nav>
      <div className="mt-6 text-xl ml-6 h-full w-full">
       <h1> Your Balance ${account.balance}</h1>
       <h2 className="text-2xl mt-6 mb-4"> Users : </h2>
       <TextField id="outlined-basic" label="Search Users ..." variant="outlined" className="w-[90%]" onChange={handleChange}/>
       <div className="flex flex-col mt-6 w-full">
        {usersData.map((user, index) => {
          return <div key={index} className="flex justify-between my-2">
            <h1>{user.username}</h1>

            <button className="bg-green-600 py-2 px-4 rounded-md text-white font-medium" onClick={() => sendMoneyTo(user, index)}>Send Money</button>
          </div>
        })}
       </div>
      </div>
    </div>
  );
}

export default DashBoard;
