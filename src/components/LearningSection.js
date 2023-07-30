import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import Available from "./Available";

const LearningSection = () => {
  const [learningObject, setLearningObject] = useState([]);
  const [classObject, setClassObject] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [loading, setLoading] = useState(true);

  const { classId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadClass();
    loadPage();
  }, []);

  const loadPage = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/class/learning?class_id=${classId}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if(Object.keys(res.data.payload).length === 0){
          setIsEmpty(true);
        }
        else{
          setLearningObject(res.data.payload);
          setIsEmpty(false);
        }
      })
      .catch((err) => {
        if (err) {
          if (err.response.data.status === 401) {
            console.log(err);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loadClass = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    await axios
      .get(`${process.env.REACT_APP_API_URL}/class/?class_id=${classId}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setClassObject(res.data.payload);
      })
      .catch((err) => {
        if (err) {
          if (err.response.data.status === 401) {
            console.log(err);
          }
        }
      })
      .finally(() => {
      });
  };

  return (
    <div className="container px-6 md:p-20 my-28 md:my-10 w-full md:w-10/12 mx-auto">
      {!loading ? (
        <div>
          <div className="flex justify-start items-center w-full h-auto md:h-36 px-10 py-6 md:p-10 mb-10 rounded-full border border-b-gray-200 transition ease-in-out hover:shadow-sm">
            <div className="order-2">
              <h1 className="text-left font-bold text-xl mb-2">
                {classObject.class_title}
              </h1>
              <p className="text-left text-xs md:text-sm text-stone-700">
                {classObject.class_desc}
              </p>
            </div>
            <div className="order-1 mr-10 md:mr-12">
              <div className="flex w-10 h-10 md:w-16 md:h-16 rounded-full bg-violet-600 items-center justify-center">
                <svg
                  className="text-white w-5 h-5 md:w-10 md:h-10"
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
            </div>
          </div>

          {!isEmpty ? (
            <div className="w-11/12 mx-auto">
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
                Materi List
              </h1>
              <div className="border border-stone-900 border-b-1 mt-5"></div>

              <div className="grid my-4 gap-6">
                {learningObject &&
                  learningObject.map((i) => {
                    return (
                      <button
                        onClick={() => navigate("learning/" + i.learning_id)}
                        className="flex justify-center"
                        key={i.learning_id}
                      >
                        <div className="flex justify-start items-center w-full h-auto md:h-28 p-6 md:p-10 rounded-lg border border-b-gray-200 border-b-4 hover:border-b-violet-600 hover:border-b-[6px] transition ease-in-out hover:shadow-sm">
                          <div className="order-2">
                            <h1 className="text-left font-bold text-base md:text-lg mb-1">
                              {i.learning_title}
                            </h1>
                            <p className="text-left text-xs text-stone-700">
                              {i.learning_desc}
                            </p>
                          </div>
                          <div className="order-1 mr-5 md:mr-12">
                            <div className="flex items-center justify-center">
                              <svg
                                className="text-violet-600 w-10 h-10"
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
                                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div> ) : (<Available/>)}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default LearningSection;
