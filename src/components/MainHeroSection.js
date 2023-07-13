import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

import Star from "../assets/star.png";

const MainHeroSection = () => {
  const [classObject, setClassObject] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    reloadPage();
  }, []);

  const reloadPage = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    await axios
      .get(`${process.env.REACT_APP_API_URL}/class`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const dataClass = res.data.payload.slice(0, 3);
        setClassObject(dataClass);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      {!loading ? (
        <div className="container w-10/12 mx-auto py-0 md:py-12 md:my-20">
          <div className="flex px-3 py-4 md:p-10 border rounded-full items-center justify-center">
            <div className="flex flex-col order-2 items-center justify-center">
              <h1 className="text-xl md:text-4xl text-stone-900 text-center">Welcome, Students!</h1>
              <p className="mt-1 md:mt-4 text-sm text-stone-600">
                Ready to study today?
              </p>
            </div>
            <div className="order-1 mx-3 md:mx-36">
              <img
                src={Star}
                alt="star-images"
                className="w-5 md:w-12 -scale-x-100"
              ></img>
            </div>
            <div className="order-3 mx-3 md:mx-36">
              <img src={Star} alt="star-images" className="w-5 md:w-12"></img>
            </div>
          </div>

          <h1 className="flex text-xl md:text-3xl text-stone-900 mt-12 md:mt-32 items-center">
            <svg
              className="text-stone-900 w-4 h-4 md:w-10 md:h-10 mr-2 md:mr-3"
              fill="none"
              stroke="currentColor"
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
            Ready to explore, today?
          </h1>
          <p className="mt-4 text-sm md:text-base text-stone-900 border rounded-full p-4 px-8 flex items-center">
            I can feel your excitement for learning, keep it up!{" "}
            <svg
              className="w-10 h-10 md:w-4 md:h-4 ml-2"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
              />
            </svg>
          </p>

          <div className="grid gap-6 md:gap-0 md:grid-cols-3 mt-10 p-10 rounded-lg bg-gradient-to-r from-yellow-100 to-pink-100 bg-opacity-20 backdrop-blur-xl content-center">
            {classObject &&
              classObject.map((i) => {
                return (
                  <button
                    onClick={() => navigate("learning/" + i.class_id)}
                    key={i.class_id}
                    className="flex flex-col w-10/12 h-[240px] md:h-[210px] mx-auto justify-start items-center p-6 rounded-lg bg-white border-white border-b-violet-600 border-b-4 hover:border-b-[6px]"
                  >
                    <div className="flex w-20 h-20 rounded-full bg-violet-600 items-center justify-center">
                      <svg
                        className="text-white w-12 h-12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                        />
                      </svg>
                    </div>
                    <h1 className="text-xl font-bold mt-4 ">{i.class_title}</h1>
                    <div className="text-xs mt-2 text-center">
                      {i.class_desc}
                    </div>
                  </button>
                );
              })}
          </div>
          <div className="flex flex-col w-full items-center justify-center mb-28 md:mb-0 ">
            <h1 className="mt-12 md:mt-32 text-xl md:text-4xl text-stone-900 text-center">
              Why Learning Code?
            </h1>
            <p className="mt-4 text-sm md:text-base text-stone-900 border rounded-full w-72 p-2 md:p-4 px-8 flex items-center justify-center">
              This is great start for you!
            </p>
            <div className="grid md:grid-cols-3 mt-10 gap-6 w-full">
              <div className="p-4 py-6 rounded-lg bg-pink-100">
                <h1 className="text-lg md:text-2xl text-stone-900 text-center">
                  Popularity
                </h1>
                <div className="text-xs mt-2 text-center">
                  Technical skills are in high demand. Over 60% of new jobs
                  worldwide will require tech skills.
                </div>
              </div>
              <div className="p-4 py-6 rounded-lg bg-violet-100">
                <h1 className="text-lg md:text-2xl text-stone-900 text-center">
                  Future's Promising
                </h1>
                <div className="text-xs mt-2 text-center">
                  Unlock your earning potential! Entry-level programmers earn on
                  average over $50,000 in salary.
                </div>
              </div>
              <div className="p-4 py-6 rounded-lg bg-amber-100">
                <h1 className="text-lg md:text-2xl text-stone-900 text-center">Fun</h1>
                <div className="text-xs mt-2 text-center">
                  Imagine combining your passion and skill with your creativity,
                  and making something new everyday!
                </div>
              </div>
            </div>
            <button
              type="button"
              className="mt-6 md:mt-10 text-white bg-violet-600 font-medium rounded-full text-sm px-10 py-2 text-center transition ease-in-out delay-150 hover:-translate-y-0 hover:scale-110 hover:bg-grey-100 duration-300"
              onClick={() => navigate("learning/")}
            >
              Start Learning
            </button>
          </div>
        </div>
      ) : (
        <div className="py-10">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default MainHeroSection;
