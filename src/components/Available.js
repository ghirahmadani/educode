import React from 'react'

import Sad from '../assets/chara-3.png'

const Available = () => {
  return (
    <div className="container px-6 md:p-20 my-28 md:my-6 w-full md:w-10/12 mx-auto flex flex-col gap-10 justify-center items-center">
        <img src={Sad} alt="Character" className="w-96"></img>
        <h1 className="text-left font-bold text-sm md:text-xl mb-2 p-4 px-10 bg-gray-100 rounded-full">Maaf, kelas belum tersedia!</h1>
    </div>
  )
}

export default Available;