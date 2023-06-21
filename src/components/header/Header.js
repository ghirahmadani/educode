import React from 'react';

import { Link } from 'react-router-dom';

import Icon from '../../assets/logo.png';

const Header = () => {
    return(
        <nav className="bg-stone-900 fixed w-full z-20 top-0 left-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 h-20">
                <Link to='/' className="flex items-center">
                    <img src={Icon} className="h-8 mr-3 transition ease-in-out delay-150 hover:-translate-y-0 hover:scale-105 duration-300" alt="Educode" />
                </Link>
                
                <div className="flex order-2">
                    <Link to='/login'>
                    <button type="button" className="text-stone-900 bg-white font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 transition ease-in-out delay-150 hover:-translate-y-0 hover:scale-110 hover:bg-grey-100 duration-300">Start Learning</button>
                    </Link>
                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-white rounded-lg md:hidden hover:bg-white hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-sticky" aria-expanded="false">
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Header;