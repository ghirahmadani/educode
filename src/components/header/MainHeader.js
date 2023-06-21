import React from "react";
import Icon from "../../assets/logo.png";

import Avatar from "../../assets/avatar/Asset 11.png";
import { Link } from "react-router-dom";

const MainHeader = (props) => {
  return (
    <nav className="bg-stone-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto h-20">
        <div className="flex order-1">
          <Link to='/home' className="flex items-center">
            <img
              src={Icon}
              className="h-8 mr-3 transition ease-in-out delay-100 hover:-translate-y-0 hover:scale-105 duration-300"
              alt="Educode"
            />
          </Link>
        </div>
        <div className="flex order-3">
          <div className="flex border border-gray-400 rounded-lg px-3 py-2 transition ease-in-out delay-150 hover:border-white hover:scale-105 duration-200">
            <p className="flex text-white items-center mr-4">Welcome, Nurmi</p>
            <img
              className="w-10 h-10 p-1 rounded-full ring-1 ring-gray-200"
              src={Avatar}
              alt="Bordered avatar"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainHeader;
