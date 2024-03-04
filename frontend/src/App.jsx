import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn";
import DashBoard from "./components/DashBoard"
import { useEffect, useState } from "react";
import AuthLayOut from "./components/AuthLayOut";
import './App.css'

function App() {
  const [token, setToken] = useState("")
  useEffect(() => {
    const token = localStorage.getItem("token")
    setToken(token)
    console.log(token)
  }, [])
  return (
    <BrowserRouter>
     <div className="flex items-center justify-center h-full w-full "> <Routes>
       <Route path="/" element={
         <DashBoard/>
       } />
        <Route path="/signup" element = {<SignUp />} />
        <Route path="/signin" element = {<SignIn />} />
        {/* <Route path="/send" element = {<Transfer />} /> */}
      </Routes></div>
     
    </BrowserRouter>
  );
}

export default App;


// <AuthLayOut token={token}><DashBoard/></AuthLayOut> 