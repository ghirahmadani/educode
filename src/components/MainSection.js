import { Link } from "react-router-dom";
import useFetch from "./useFetch";

const MainSection = () => {

  const { data:content } = useFetch('http://localhost:8000/content')

  return (
    <div className="container p-20">
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
        Learning Category
      </h1>
      <div className="border border-stone-900 border-b-1 mt-5"></div>

      <div className="grid grid-cols-2 gap-4 my-10">
        {content && content.map((i) => {
          return (
            <div className="flex justify-center" key={i.id}>
              <div className="flex justify-between w-full h-48 p-10 rounded-lg border transition ease-in-out hover:shadow-sm">
                <div className="order-1">
                  <h1 className="text-left font-bold text-xl mb-2">
                    {i.title}
                  </h1>
                  <p className="text-left text-sm text-stone-700">{i.desc}</p>
                </div>
                <div className="order-2">
                  <Link to={`learning/${i.id}`}>
                  <button
                    type="button"
                    className="text-white bg-violet-400 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 w-24 h-full transition ease-in-out hover:bg-violet-600"
                  >
                    Start
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainSection;
