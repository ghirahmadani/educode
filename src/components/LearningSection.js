import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const LearningSection = () => {
  const { id } = useParams();

  const {data:content} = useFetch('http://localhost:8000/content/'+ id)

  return (
    <div className="container p-20 mb-10">
      <h1 className="flex justify-left items-center font-extrabold">
        <svg
          fill="none"
          stroke="currentColor"
          className="w-5 h-5 mr-2 text-stone-900"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Learning Menu
      </h1>
      <div className="border border-stone-900 border-b-1 mt-5"></div>

      <div className="grid my-4 gap-6">
        {content && content.learning.map((i) => {
          return(
          <div className="grid grid-cols-8 gap-10 content-center min-w-full rounded-lg border transition ease-in-out hover:shadow-md p-6" key={i.learningId}>
            <div className="w-full h-20 bg-gray-200 rounded-lg"></div>
            <div className="grid col-span-6 h-full content-center gap-1">
              <h1 className="text-left font-bold text-xl">
                {i.learningTitle}
              </h1>
              <p className="text-left text-sm text-gray-700">
                {i.learningDesc}
              </p>
            </div>
            <div className="items-center col-span-1">
              <button
                type="button"
                className="text-white h-full w-full bg-violet-400 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3  transition ease-in-out hover:bg-violet-600"
              >
                Start
              </button>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  );
};

export default LearningSection;
