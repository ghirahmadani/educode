import React from "react";

const LessonHeader = () => {
  return (
    <nav className="bg-stone-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex order-1">
          <div className="flex px-3 py-2 transition ease-in-out delay-150 hover:border-white hover:scale-105 duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="white"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <p className="flex text-white items-center">Close</p>
          </div>
        </div>
        <div className="flex order-2">
          <div className="flex border border-gray-400 rounded-lg px-3 py-2 transition ease-in-out delay-150 hover:border-white hover:scale-105 duration-200">
            <p className="flex items-center justify-center text-white">
              Pengantar Perulangan
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LessonHeader;
