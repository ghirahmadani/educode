import React from "react";

import { Link } from "react-router-dom";

const BottomNavigation = () => {
    return(
        <div className="fixed bottom-0 left-0 z-50 w-full h-20 bg-white border-t border-gray-200 ">
        <div className="grid items-center justify-items-center h-full max-w-lg grid-cols-3 mx-auto font-medium">
          <Link to='/home'>
          <button type="button" className="inline-flex flex-col items-center justify-center px-5 group">
            <svg className="w-6 h-6 mb-1 text-gray-500 group-hover:text-violet-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <span className="text-sm text-gray-500 group-hover:text-violet-600">Home</span>
          </button>
          </Link>

          <Link to={`learning/${1}`}>
          <button type="button" className="inline-flex flex-col items-center justify-center px-5  group">
            <svg className="w-6 h-6 mb-1 text-gray-500  group-hover:text-violet-600 " fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
            </svg>
            <span className="text-sm text-gray-500 group-hover:text-violet-600">Study</span>
          </button>
          </Link>
          
          <Link to='help'>
          <button type="button" className="inline-flex flex-col items-center justify-center px-5  group">
            <svg className="w-6 h-6 mb-1 text-gray-500 group-hover:text-violet-600 " fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            <span className="text-sm text-gray-500 group-hover:text-violet-600 ">Help</span>
          </button>
          </Link>
        </div>
      </div>
    )
}

export default BottomNavigation;