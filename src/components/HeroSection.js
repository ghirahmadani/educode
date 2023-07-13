import React from "react";

import { useNavigate } from "react-router-dom";
import Particle from "./Particle";

import Star from "../assets/star.png"

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-violet-900 via-violet-600 to-pink-400">
      <Particle/>
      <div className="relative isolate px-4 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-64 md:py-48 lg:py-56 w-full">
          <div className="flex flex-col items-center text-center w-full">
            <div className="flex items-center justify-center w-9/12 md:w-full bg-white p-3 md:p-6 rounded-full">
              <div className="order-1 mx-4 md:mx-10">
                  <img src={Star} alt="star-images" className="w-4 md:w-10 -scale-x-100"></img>
              </div>
              <div className="order-3 mx-4 md:mx-10">
                  <img src={Star} alt="star-images" className="w-4 md:w-10"></img>
              </div>
              <div className="order-2">
                <h1 className="title text-2xl md:text-6xl font-black md:font-bold tracking-tight text-stone-900">&lt; Educode &gt;</h1>
              </div>
            </div>
            
            <p className="my-6 text-sm md:text-base text-white leading-6 tracking-normal">First, solve the problem. Then, write the code.<br/>Let's <span className="font-bold tracking-wider">start</span> learn to code!</p>
            <button type="button"className="text-stone-900 bg-white font-medium rounded-lg text-sm px-6 py-2 text-center transition ease-in-out delay-150 hover:-translate-y-0 hover:scale-110 hover:bg-grey-100 duration-300"
              onClick={() => navigate('/home')}>Start Learning</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
