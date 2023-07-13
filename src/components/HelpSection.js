import React from "react";
import { Link } from "react-router-dom";
import Chara from "../assets/help.png";

const HelpSection = () => {
  return (
    <div className="md:container p-6 md:p-20 w-full md:w-10/12 mx-auto">
      <div className="grid md:grid-cols-2 justify-items-center content-center gap-10 md:gap-0 my-20 md:my-0">
        <div className="w-11/12 h-[300px] md:h-[1000px] bg-purple-100 md:my-24 rounded-lg"></div>
        <div className="w-11/12 h-[300px] md:h-[1000px] bg-purple-100 md:my-24 rounded-lg"></div>
      </div>

      <h1 className="flex justify-start items-center text-left font-extrabold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-stone-900 mr-2"
        >
          {" "}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
          />
        </svg>
        Bantuan
      </h1>
      <div className="border border-stone-900 border-b-1 mt-5 md:mb-0"></div>

      <div className="flex flex-col md:flex-row justify-center items-center w-full rounded-full h-auto md:h-48 md:border p-4 gap-10 my-4 mb-20 md:mb-12">
        <img src={Chara} className="h-24 w-max" alt="..."></img>
        <div className="flex flex-col items-center">
          <h1 className="text-center md:text-left font-bold text-xl mb-2">Perlu Bantuan?</h1>
          <p className="text-center md:text-left text-sm text-stone-700">
            Bantuan tambahan dalam mengakses aplikasi, tekan tombol ini.
          </p>
          <Link to="https://wa.me/6281807362365">
            <button
              type="button"
              className="text-white bg-violet-400 font-medium rounded-full text-sm px-4 py-2 text-center mt-4 mr-3 w-[100px] transition ease-in-out hover:bg-violet-600"
            >
              Help Me!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
