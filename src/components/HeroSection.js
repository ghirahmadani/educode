import React from "react";

import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50" />
        </div>
      </header>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="title text-6xl font-bold tracking-tight text-stone-900">
              EDUCODE
            </h1>
            <p className="mt-6 mb-6 text-lg leading-8 text-stone-900">
              Let's <strong>Start</strong> Learn to Code
            </p>
            <Link to='/login'>
            <button
              type="button"
              className="text-white bg-violet-400 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 transition ease-in-out delay-150 hover:-translate-y-0 hover:scale-110 hover:bg-grey-100 duration-300"
            >
              Start Learning
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
