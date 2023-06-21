import React from "react";

import { Link } from "react-router-dom";

import Chara from "../help.png";

const HelpSection = () => {
  return (
    <div className="container p-20">
      <div className="grid grid-cols-2 justify-items-center content-center">
        <div className="w-11/12 h-[1000px] bg-purple-100 my-24 rounded-lg"></div>
        <div className="w-11/12 h-[1000px] bg-purple-100 my-24 rounded-lg"></div>
      </div>
      <h1 h1 className="flex justify-left font-extrabold">
        Bantuan
      </h1>
      <div className="border border-stone-900 border-b-1 mt-5"></div>

      <div className="grid content-center my-10">
          <div className="grid grid-cols-6 content-center min-w-full rounded-lg h-56 border transition ease-in-out hover:shadow-md p-4">
            <div className="px-6 py-4 col-span-2 grid place-items-center">
                <img src={Chara} className="h-32 w-max transition ease-in-out hover:scale-105" alt="..."></img>
            </div>
              <div className="px-6 py-4 col-span-4">
                <div className="text-left font-bold text-xl mb-2">Need help?</div>
                <p className="text-left text-gray-700 text-base">
                  Bantuan tambahan dalam mengakses aplikasi, tekan tombol ini.
                </p>
                <Link to="https://wa.me/6281807362365">
                <button
                  type="button"
                  className="text-white bg-violet-400 font-medium rounded-lg text-sm px-4 py-2 text-center mt-4 mr-3 w-full transition ease-in-out hover:bg-violet-600"
                >
                  Help Me!
                </button>
                </Link>
              </div>
          </div>
      </div>
    </div>
  );
};

export default HelpSection;
