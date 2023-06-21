import React from 'react'

import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="container w-full mx-auto">
        <div className="container w-9/12 mx-auto">
            <div className="grid grid-cols-2 py-36 mt-24">
                <div className="order-1">
                    <div className="grid justify-items-start pb-4">
                        <div className="relative rounded-full px-3 py-1 w-20 text-sm text-center leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                        Error
                        </div>
                    </div>
                    <h1 className="text-5xl text-left fredoka font-bold text-stone-900 pb-4">
                    Page Not Found
                    </h1>
                    <p className="text-md text-justify leading-7 text-stone-800">
                    Let's go back to learn!
                    </p>
                    <Link to='/'>
                        <button type="button" className="text-white bg-violet-400 font-medium rounded-lg text-sm px-4 py-2 mt-6 text-center transition ease-in-out delay-150 hover:-translate-y-0 hover:scale-110 hover:bg-grey-100 duration-300">Back</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NotFound