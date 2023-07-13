import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import Alert from "./Alert";
import { useFieldArray } from "react-hook-form";

const AdminLesson = () => {
  const [openLesson, setOpenLesson] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);

  const [openQuiz, setOpenQuiz] = useState(false);

  const [lessonObject, setlessonObject] = useState([]);

  const [lessonId, setLessonId] = useState(-1);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDesc, setLessonDesc] = useState("");
  const [lessonNotes, setLessonNotes] = useState("");
  const [lessonSnippets, setLessonSnippets] = useState("");
  const [lessonFiles, setLessonFiles] = useState([]);

  const { handleSubmit, register, control } = useForm({
    defaultValues: {
      quiz_options: [
        {
          quiz_option_desc: "",
          is_true: false,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "quiz_options",
    control,
  });

  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const { learningId } = useParams();

  useEffect(() => {
    showLesson();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsSuccess(null);
    }, 3000);
  }, [setIsSuccess]);   

  const showLesson = async () => {
    setLoading(true);
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
        setlessonObject(res.data.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmitLesson = async () => {
    const form = new FormData();
    form.append("lesson_title", lessonTitle);
    form.append("lesson_text", lessonDesc);
    form.append("lesson_notes", lessonNotes);
    form.append("lesson_snippet", lessonSnippets);
    const value = Object.fromEntries(form.entries());

    const files = new FormData();
    files.append("files", lessonFiles);

    if (lessonId === -1) {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/class/learning/lesson/new-lesson?learning_id=${learningId}`,
          form,
          {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          axios
            .post(
              `${process.env.REACT_APP_API_URL}/class/learning/lesson/files/new-files?lesson_id=${res.data.payload.lesson_id}`,
              files,
              {
                headers: {
                  "content-type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              setIsSuccess("Success Upload");
              setOpenLesson(false);
              showLesson();
            })
            .catch((err) => console.log(err));
        });
    } else {
      await axios
        .put(
          `${process.env.REACT_APP_API_URL}/class/learning/lesson/update-lesson?lesson_id=${lessonId}`,
          value,
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          axios
            .post(
              `${process.env.REACT_APP_API_URL}/class/learning/lesson/files/new-files?lesson_id=${res.data.payload.lesson_id}`,
              files,
              {
                headers: {
                  "content-type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              setIsSuccess("Success Upload");
              setOpenLesson(false);
              showLesson();
            })
            .catch((err) => console.log(err));
          setIsSuccess(res.data.message);
          setOpenLesson(false);
          showLesson();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    setLessonId(lessonId);
    await axios
      .delete(
        `${process.env.REACT_APP_API_URL}/class/learning/lesson/delete-lesson?lesson_id=${lessonId}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setIsSuccess("Delete Success");
        showLesson();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteFiles = async (filename) => {
    await axios
      .delete(
        `${process.env.REACT_APP_API_URL}/class/learning/lesson/files/delete-files?path=uploads/${filename}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setIsSuccess("Delete Success");
        showLesson();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteQuiz = async (quizId) => {
    await axios
      .delete(
        `${process.env.REACT_APP_API_URL}/class/learning/lesson/quiz/delete-quiz?quiz_id=${quizId}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setIsSuccess("Delete Success");
        showLesson();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = async (data) => {

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/class/learning/lesson/quiz/new-quiz?lesson_id=${lessonId}`,
        data,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res)
        setIsSuccess(res.data.message);
        showLesson()
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showUpdateLesson = async (lessonId) => {
    setOpenLesson(true);
    setLessonId(lessonId);
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/class/learning/lesson/?lesson_id=${lessonId}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLessonTitle(res.data.payload[0].lesson_title);
        setLessonDesc(res.data.payload[0].lesson_text);
        setLessonNotes(res.data.payload[0].lesson_notes);
        setLessonSnippets(res.data.payload[0].lesson_snippet);
        showLesson();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="my-20">
      {isSuccess && (
        <Alert
          isSuccess={isSuccess}
          handleSuccess={(isSuccess) => {
            setIsSuccess(isSuccess);
          }}
        />
      )}
      {!loading ? (
        <div>
          <div className="w-11/12 flex justify-end mx-auto my-8">
            {!openLesson && (
              <div className="order-2">
                <button
                  onClick={() =>
                    setOpenLesson(true) &
                    setLessonId(-1) &
                    setLessonTitle("") &
                    setLessonDesc("") &
                    setLessonNotes("") &
                    setLessonSnippets("")
                  }
                  className="bg-gray-100 p-2 px-4 rounded-lg flex items-center hover:bg-gray-200"
                >
                  <svg
                    fill="none"
                    className="w-4 h-4 text-stone-900 mr-2"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  New Lesson
                </button>
              </div>
            )}
          </div>

          {openLesson && (
            <form
              className="w-11/12 flex flex-col mx-auto gap-4 mb-12"
              onSubmit={handleSubmit(handleSubmitLesson)}
            >
              <label>Lesson Title</label>
              <input
                type="text"
                value={lessonTitle}
                onChange={(event) => setLessonTitle(event.target.value)}
                className="border-gray-200 rounded-lg"
              ></input>
              <label>Lesson Description</label>
              <input
                type="text"
                value={lessonDesc}
                onChange={(event) => setLessonDesc(event.target.value)}
                className="border-gray-200 rounded-lg"
              ></input>
              <label>Lesson Notes</label>
              <input
                type="text"
                value={lessonNotes}
                onChange={(event) => setLessonNotes(event.target.value)}
                className="border-gray-200 rounded-lg"
              ></input>
              <label>Lesson Link</label>
              <input
                type="text"
                value={lessonSnippets}
                onChange={(event) => setLessonSnippets(event.target.value)}
                className="border-gray-200 rounded-lg"
              ></input>
              <label>Lesson Files</label>
              <input
                type="file"
                onChange={(event) => {
                  setLessonFiles(event.target.files[0]);
                }}
                className="border-gray-200 rounded-lg"
              ></input>
              <button
                type="submit"
                className="w-full p-4 bg-violet-600 text-white rounded-lg"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setOpenLesson(false)}
                className="w-full p-4 bg-white text-stone-900 border rounded-lg"
              >
                Cancel
              </button>
            </form>
          )}

          <div className="w-11/12 mx-auto relative overflow-x-auto border-gray-200 border-2">
            <table className="w-full text-sm text-left">
              <thead className="text-sm text-gray-700 bg-gray-50">
                <tr>
                  <th scope="col" className="w-2/6 px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="w-3/6 px-6 py-3">
                    Content
                  </th>
                  <th scope="col" className="w-1/6 px-6 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {lessonObject &&
                  lessonObject.map((i, key) => {
                    return (
                      <tr className="bg-white hover:bg-gray-50" key={key}>
                        <td className="px-6 py-4">{i.lesson_title}</td>
                        <td className="px-6 py-4 space-y-4">
                          <p className="font-semibold">Text</p>
                          {i.lesson_text}
                          {i.lesson_notes && (
                            <p className="font-semibold">
                              Notes
                              <br />
                              {i.lesson_notes}
                            </p>
                          )}
                          {i.lesson_snippet && (
                            <p className="font-semibold">
                              Link
                              <br />
                              {i.lesson_snippet}
                            </p>
                          )}
                          {Object.keys(i.Files).length !== 0 && (
                            <p className="font-semibold">
                              Files
                              <br />
                              {i.Files[0].filename}
                            </p>
                          )}
                          {Object.keys(i.Quizzies).length !== 0 && (
                            <p>{i.Quizzies[0].quiz_soal}</p>
                          )}
                        </td>
                        <td className="px-6 py-4 gap-2 flex flex-col items-center">
                          <button
                            className="font-medium p-2 border rounded-lg w-24 text-violet-600 hover:underline"
                            value={i.lesson_id}
                            onClick={(event) =>
                              showUpdateLesson(event.target.value)
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="font-medium p-2 border rounded-lg w-24 text-violet-600 hover:underline"
                            value={i.lesson_id}
                            onClick={(event) =>
                              handleDeleteLesson(event.target.value)
                            }
                          >
                            Delete
                          </button>
                          {Object.keys(i.Files).length !== 0 && (
                            <button
                              className="font-medium p-2 border rounded-lg w-24 text-violet-600 hover:underline"
                              value={i.Files[0].filename}
                              onClick={(event) =>
                                handleDeleteFiles(event.target.value)
                              }
                            >
                              Delete Files
                            </button>
                          )}
                          <button
                            className="font-medium p-2 border rounded-lg w-24 text-violet-600 hover:underline"
                            value={i.lesson_id}
                            onClick={(event) =>
                              setOpenQuiz(true) &
                              setLessonId(event.target.value)
                            }
                          >
                            Add Quiz
                          </button>
                          {Object.keys(i.Quizzies).length !== 0 && (
                            <button
                              className="font-medium p-2 border rounded-lg w-24 text-violet-600 hover:underline"
                              value={i.Quizzies[0].quiz_id}
                              onClick={(event) =>
                                handleDeleteQuiz(event.target.value)
                              }
                            >
                              Delete quiz
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="w-11/12 mt-10 mx-auto">
            {openQuiz && (
              <form
                className="flex flex-col gap-2"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label>Quiz Question</label>
                <input
                  type="text"
                  {...register("quiz_soal")}
                  className="border-gray-200 rounded-lg"
                ></input>
                {fields.map((field, index) => {
                  return (
                    <div className="flex items-center gap-6" key={field.id}>
                      <input
                        type="text"
                        placeholder="Answer"
                        {...register(`quiz_options.${index}.quiz_option_desc`)}
                        className="border-gray-200 rounded-lg w-11/12"
                      ></input>
                      <input
                        type="checkbox"
                        {...register(`quiz_options.${index}.is_true`)}
                      ></input>
                    </div>
                  );
                })}
                <button
                  type="button"
                  onClick={() =>
                    append({
                      quiz_option_desc: "",
                      is_true: false,
                    })
                  }
                  className="mt-4 hover:underline"
                >
                  Tambah Opsi
                </button>

                <button
                  className="font-medium p-2 border rounded-lg w-64 text-violet-600 hover:underline"
                  type="submit"
                >
                  Submit Quiz
                </button>
              </form>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default AdminLesson;
