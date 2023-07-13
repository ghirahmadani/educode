import React from "react";
import { Link, useNavigate } from "react-router-dom";

const LessonHeader = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-stone-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex order-1">
          <Link to="/home">
          <div className="flex md:px-3 py-2 transition ease-in-out delay-150 hover:border-white hover:scale-105 duration-200 gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="white"
              className="w-6 h-6 transition-all hover:rotate-45"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <p className="flex text-white items-center">Close</p>
          </div>
          </Link>
        </div>
        <div className="flex order-2">
          <button onClick={() => navigate('/home/help') } className="flex border border-gray-400 rounded-lg px-3 py-2 transition ease-in-out delay-150 hover:border-white hover:scale-105 duration-200">
            <p className="flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white mr-2"> <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /> </svg>
              Help
            </p>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default LessonHeader;
