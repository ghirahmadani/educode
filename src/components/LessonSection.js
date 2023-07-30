import React, { useEffect, useState } from "react";
import axios from "axios";

import Text from "../lesson/Text";

import Chara from "../assets/chara-1.png";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";

const LessonSection = () => {
  const [loading, setLoading] = useState(true);
  const { learningId } = useParams();
  const { classId } = useParams();

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    loadLearning();
    loadLesson();
  }, []);

  const [isCorrect, setIsCorrect] = useState(false);
  const [isFalse, setIsFalse] = useState(false);
  const [learningTitle, setLearningTitle] = useState("");
  const [lessonObject, setlessonObject] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const contentPerPage = 1;
  const lastIndex = currentPage * contentPerPage;

  const displayPage = lessonObject.slice(lastIndex, lastIndex + 1).map((i) => {
    return (
      <div key={i.lesson_id}>
        {i.lesson_title && (
          <div className="order-2">
            <h1 className="mt-2 text-2xl text-left font-bold tracking-tight text-stone-900 sm:text-4xl">
              {i.lesson_title}
            </h1>
          </div>
        )}
        {i.lesson_text && (
          <div className="order-3">
            <Text text={i.lesson_text} />
          </div>
        )}
        {i.lesson_snippet && (
          <div className="order-5 flex justify-center items-center py-10 mx-auto">
            <iframe
              className="w-[19.5rem] h-[11rem] md:w-[27.5rem] md:h-[15.5rem]"
              src={i.lesson_snippet}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        )}
        {Object.keys(i.Files).length !== 0 && (
          <div className="order-4 w-full rounded-lg overflow-hidden mt-6">
            <img
              src={`${process.env.REACT_APP_API_URL}/asset?path=uploads/${i.Files[0].filename}`}
              alt="materi"
            />
          </div>
        )}
        {i.lesson_notes && (
          <div className="order-6 flex flex-col md:flex-row justify-between items-center mt-10 md:mt-6 w-full h-auto md:h-28 py-8 md:py-0 bg-violet-50 rounded-[2rem] md:rounded-full px-6 md:px-10 gap-4 md:gap-4">
            <div className="order-1 flex md:flex-none w-full md:w-auto justify-start items-center">
              <img
                src={Chara}
                className="ml-4 md:ml-0 w-12 md:w-20"
                alt="..."
              ></img>
              <p className="font-bold ml-4 md:hidden">Remember This!</p>
            </div>
            <div className="order-2">
              <p className="text-xs md:text-sm font-medium leading-5 md:leading-6">
                {i.lesson_notes}
              </p>
            </div>
          </div>
        )}
        {Object.keys(i.Quizzies).length !== 0 && (
          <div className="flex flex-col gap-4 mt-4">
            <p className="p-4 rounded-lg bg-gray-100 w-full text-sm md:text-sm">
              {i.Quizzies[0].quiz_soal}
            </p>
            {i.Quizzies[0].Options.map((i, key) => {
              return (
                <div key={key}>
                  <button
                    className={`rounded-lg w-full p-4 border ${
                      i.is_true && "focus:border-4 focus:border-violet-600"
                    } ${
                      !i.is_true && "focus:border-4 focus:border-red-600"
                    } hover:bg-gray-100 transform active:scale-90 transition-transform text-sm md:text-sm`}
                    onClick={() => handleQuiz(i.is_true)}
                  >
                    {i.quiz_option_desc}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  });

  const pageCount = Math.ceil(lessonObject.length / contentPerPage);

  const handlePrev = () => {
    if (currentPage !== 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage !== pageCount - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      navigate("/home/class/" + classId + "/learning/" + learningId + "/done");
    }
  };

  const handleQuiz = (isCorrect) => {
    if (isCorrect) {
      setIsFalse(false);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      setIsFalse(true);
    }
  };

  const loadLearning = async () => {
    setLoading(true);
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/class/learning/?learning_id=${learningId}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLearningTitle(res.data.payload.learning_title);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadLesson = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/class/learning/lesson?learning_id=${learningId}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        let dataArr = Array.from(res.data.payload);
        setlessonObject(dataArr);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsCorrect(false);
    }, 5000);
  }, [isCorrect]);

  useEffect(() => {
    setTimeout(() => {
      setIsFalse(false);
    }, 5000);
  }, [isFalse]);

  const [progress, setProgress] = useState();

  useEffect(() => {
    countProgress();
  }, [lastIndex, lessonObject]);

  const countProgress = () => {
    if (lessonObject.length !== 0) {
      const index = lastIndex + 1;
      const count = (index / lessonObject.length) * 100;
      setProgress(count);
    }
  };

  return (
    <div className="flex justify-center overflow-hidden bg-white px-6 py-32">
      {isCorrect && (
        <div className="fixed p-4 w-10/12 mx-auto rounded-lg bg-violet-600 text-white text-center z-10">
          Correct Answer!
        </div>
      )}
      {isFalse && (
        <div className="fixed p-4 w-10/12 mx-auto rounded-lg bg-red-600 text-white text-center z-10">
          Wrong Answer!
        </div>
      )}

      {!loading ? (
        <div className="w-full container flex">
          <div className="flex justify-center fixed top-24 left-0 w-full h-2 px-8 md:px-4">
            <div className="w-full md:w-1/3 border border-solid rounded-lg border-gray-200 overflow-hidden">
              <div
                className="bg-violet-600 w-0 h-full"
                style={{ width: progress + "%" }}
              ></div>
            </div>
          </div>
          <div className="flex flex-col container w-full md:w-1/3 px-4 md:px-0 md:py-4 gap-y-1 mx-auto">
            <div className="order-1">
              <p className="text-sm md:text-base text-left font-semibold leading-7 text-violet-600">
                {learningTitle}
              </p>
            </div>
            <div className="order-2">{displayPage}</div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
      <div className="flex justify-center fixed bottom-0 left-0 w-full h-24 bg-white border border-solid border-t border-gray-200">
        <div className="container w-full md:w-1/3 h-full px-6 md:px-0 flex justify-between items-center">
          <div className="flex order-1">
            <button
              type="button"
              onClick={() => handlePrev()}
              className="w-32 py-3 px-5 md:ml-2 mb-2 text-sm font-medium text-violet-600 bg-white rounded-lg border border-violet-400 hover:bg-violet-100 hover:violet-600 focus:outline-none focus:z-10 focus:ring-4 focus:ring-violet-400"
            >
              Back
            </button>
          </div>

          <div className="flex order-2">
            <button
              type="button"
              onClick={() => handleNext()}
              className="w-32 px-5 py-3 md:mr-2 mb-2 text-white font-medium text-sm bg-violet-400 rounded-lg  hover:bg-violet-600 focus:ring-4 focus:ring-violet-400"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonSection;
