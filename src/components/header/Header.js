import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../assets/logo.png';

const Header = () => {
    const navigate = useNavigate();

    return(
        <nav className="bg-stone-900 fixed w-full z-20 top-0 left-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-5 sm:px-5 sm:py-4 h-20">
                <Link to='/' className="flex items-center">
                    <img src={Icon} className="h-4 sm:h-8 mr-3 transition ease-in-out delay-150 hover:-translate-y-0 hover:scale-105 duration-300" alt="Educode" />
                </Link>
                
                <div className="flex order-2">
                    <button type="button" onClick={() => navigate('/home')} className="text-stone-900 bg-white font-medium rounded-lg text-sm px-4 py-2 text-center transition ease-in-out delay-150 hover:-translate-y-0 hover:scale-110 hover:bg-grey-100 duration-300">Start Learning</button>
                </div>
            </div>
        </nav>
    );
}

export default Header;