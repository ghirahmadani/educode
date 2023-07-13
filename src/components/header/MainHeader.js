import React, { useEffect, useState } from "react";
import Icon from "../../assets/logo.png";

import Avatar from "../../assets/avatar/Asset 11.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const MainHeader = (props) => {

  const [userObject, setUserObject] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    handleUser()
  },[])
  
  const handleUser = async() => {
    const token = localStorage.getItem("token")
    await axios
    .get(`${process.env.REACT_APP_API_URL}/user/`, 
      {
        headers: {
          "content-type":"application/json",
          Authorization : `Bearer ${token}`
        }
      })
    .then((res) => {
      setUserObject(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login')
  }

  return (
    <nav className="bg-stone-900 fixed w-full z-20 top-0 left-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-6 sm:px-0 h-20">
        <div className="flex order-1">
          <Link to='/home' className="flex items-center">
            <img
              src={Icon}
              className="h-4 sm:h-8 sm:mr-3 transition ease-in-out delay-100 hover:-translate-y-0 hover:scale-105 duration-300"
              alt="Educode"
            />
          </Link>
        </div>
        <div className="flex order-3">
          <div className="dropdown dropdown-end">
          <label tabIndex={0} className="flex sm:border border-gray-400 rounded-lg sm:px-3 py-2 transition ease-in-out delay-150 hover:border-white hover:scale-105 duration-200 cursor-pointer">
              <p className="hidden sm:flex text-white items-center mr-4">Hi, {userObject.Username}</p>
              <img
                className="w-10 h-10 p-1 rounded-full ring-1 ring-gray-200"
                src={Avatar}
                alt="Bordered avatar"
              />
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu py-2 mt-2 shadow bg-base-100 rounded-md w-24">
            <li><button onClick={() => {handleLogout()}} className="block px-4 py-2">Logout</button></li>
          </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainHeader;
