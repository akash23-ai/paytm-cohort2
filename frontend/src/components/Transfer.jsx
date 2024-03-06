import { useEffect, useState } from "react";
import { Avatar, TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";


function SendMoney() {
  const [user, setUser] = useState("");
  const [amount, setAmount] = useState(0);
  const [token, setToken] = useState("");

  const params = useParams()


  const navigate = useNavigate();
  // could have used redux or context api to manage state and user data
  useEffect(() => {
    const token = localStorage.getItem("token")
    setToken(token)
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:3000/api/v1/user/getUser/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUser(data);
     
    }

    fetchUser();
  }, [])


  const handleChange = (e) => {
    // here check if the value is a number or not
    if(e.target.value){
      setAmount(e.target.value)
    }

  }

  const sendMoneyTo = async(user, amount) => {
   
    if(!token) navigate("/signin");
   const response = await fetch(`http://localhost:3000/api/v1/account/transfer`, {
      method : "POST", 
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body : JSON.stringify({
        amount : amount,
        to : user.user.username
      })

   })
   
    const data = await response.json();

    console.log(data)

    if(data){
      navigate("/", 5000)
    }

  }


  

  console.log(user)
  if(!user) return <><h1>Loading .....</h1></>
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
          <h1 className="text-2xl font-bold">{user.user.firstName}{" "} {user.user.lastName}</h1>
        </div>
        <div className="p-2">
          <h1 className="text-xl font-bold mb-3">Amount (in Rs)</h1>
          <TextField id="outlined-basic" label="Amount" variant="outlined" className="w-full" sx={{marginBottom : "1rem"}} onChange={handleChange}/>
          <Button variant="contained" className="w-full" sx={{paddingY:"wrem"}} onClick={() => sendMoneyTo(user, amount)}>Send Money</Button>
        </div>

        
      </div>
    </div>
  );
}

export default SendMoney;
