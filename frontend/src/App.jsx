import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn";
import DashBoard from "./components/DashBoard"
import { useEffect, useState } from "react";
import AuthLayOut from "./components/AuthLayOut";
import Logout from "./components/Logout";
import Setting from "./components/Setting";
import Transfer from "./components/Transfer"
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
        <AuthLayOut><DashBoard token={token}/></AuthLayOut> 
       } />
        <Route path="/signup" element = {<SignUp  />} />
        <Route path="/signin" element = {<SignIn />} />
        <Route path="/settings" element = {<AuthLayOut><Setting /></AuthLayOut>} />
        <Route path="/logout" element = {<AuthLayOut><Logout/></AuthLayOut>} />
        <Route path="/transfer/:id" element = {<AuthLayOut><Transfer /></AuthLayOut>} />
      </Routes></div>
     
    </BrowserRouter>
  );
}

export default App;


// <AuthLayOut token={token}><DashBoard/></AuthLayOut> 