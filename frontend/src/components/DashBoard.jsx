import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Spinner from "./ui/Spinner";
import Navbar from "./ui/Navbar";



function DashBoard({ token }) {
  const [user, setUser] = useState("");
  const [account, setAccount] = useState("");
  const [search, setSearch] = useState("");
  const [usersData, setUsersData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      token = localStorage.getItem("token");
    }

    console.log(token);
    const fetchUser = async () => {
      const response = await fetch("http://localhost:3000/api/v1/user/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUser(data);
      console.log(data)
    };

    const fetchAccount = async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/account/balance",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log(data)
      setAccount(data);
    };

    fetchUser();
    fetchAccount();
  }, []);
  console.log(user);

  const handleChange = async (e) => {
    setSearch(e.target.value);

    const response = await fetch(
      "http://localhost:3000/api/v1/user/bulk?filter=" + e.target.value,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const bulkData = await response.json();
    console.log(bulkData.user);
    setUsersData(bulkData.user);
  };


  if (!user) return <Spinner/>;
  return (
    <div className="h-full w-[95%] text-lg font-bold">
      <Navbar user= {user} />

      <div className="mt-6 text-xl ml-6 h-full w-full">
        <h1> Your Balance ${account.balance}</h1>
        <h2 className="text-2xl mt-6 mb-4"> Users : </h2>
        <TextField
          id="outlined-basic"
          label="Search Users ..."
          variant="outlined"
          className="w-[90%]"
          onChange={handleChange}
        />
        <div className="flex flex-col mt-6 w-full">
          {usersData.map((user, index) => {
            return (
              <div key={index} className="flex justify-between my-2">
                <h1>{user.username}</h1>

                <button
                  className="bg-green-600 py-2 px-4 rounded-md text-white font-medium"
                  onClick={() => navigate(`transfer/${user._id}`)}
                >
                  Send Money
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
