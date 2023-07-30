import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Loading from "./Loading";
import Alert from "./Alert";

const AdminLearning = () => {
  const [openLearning, setOpenLearning] = useState(false);
  const [learningObject, setLearningObject] = useState([]);
  const [learningTitle, setLearningTitle] = useState("");
  const [learningDesc, setLearningDesc] = useState("");
  const [learningId, setLearningId] = useState();

  const [isSuccess, setIsSuccess] = useState(null);

  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const { handleSubmit } = useForm();

  const { classId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    showDetails();
  }, []);

  const showDetails = async () => {
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
        setLearningObject(res.data.payload);
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

  const handleSubmitLearning = async () => {
    const form = new FormData();
    form.append("learning_title", learningTitle);
    form.append("learning_desc", learningDesc);
    const value = Object.fromEntries(form.entries());

    if (learningId === -1) {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/class/learning/new-learning?class_id=${classId}`,
          value,
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setIsSuccess(res.data.message);
          setOpenLearning(false);
          showDetails();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await axios
        .put(
          `${process.env.REACT_APP_API_URL}/class/learning/update-learning?learning_id=${learningId}`,
          value,
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setIsSuccess(res.data.message);
          setOpenLearning(false);
          showDetails();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDeleteLearning = async (learningId) => {
    setLearningId(learningId);
    await axios
      .delete(
        `${process.env.REACT_APP_API_URL}/class/learning/delete-learning?learning_id=${learningId}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setIsSuccess("Success Delete");
        showDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showUpdateLearning = async (learningId) => {
    setOpenLearning(true);
    setLearningId(learningId);
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
        setLearningDesc(res.data.payload.learning_desc);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {!loading ? (
        <div>
          {isSuccess && (
            <Alert
              isSuccess={isSuccess}
              handleSuccess={(isSuccess) => {
                setIsSuccess(isSuccess);
              }}
            />
          )}

          <div className="w-11/12 flex justify-between items-center mx-auto my-8">
            <h1 className="text-2xl">Materi List</h1>
            {!openLearning && (
              <div className="order-2">
                <button
                  className="bg-gray-100 p-2 px-4 rounded-lg flex items-center hover:bg-gray-200"
                  onClick={() =>
                    setOpenLearning(true) &
                    setLearningId(-1) &
                    setLearningTitle("") &
                    setLearningDesc("")
                  }
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
                  New Learning
                </button>
              </div>
            )}
          </div>

          {openLearning && (
            <form
              className="w-11/12 flex flex-col mx-auto gap-4 mb-12"
              onSubmit={handleSubmit(handleSubmitLearning)}
            >
              <label>Learning Title</label>
              <input
                type="text"
                onChange={(event) => setLearningTitle(event.target.value)}
                value={learningTitle}
                className="border-gray-200 rounded-lg"
              ></input>
              <label>Learning Description</label>
              <input
                type="text"
                onChange={(event) => setLearningDesc(event.target.value)}
                value={learningDesc}
                className="border-gray-200 rounded-lg"
              ></input>
              <button
                type="submit"
                className="w-full p-4 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setOpenLearning(false)}
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
                    Description
                  </th>
                  <th scope="col" className="w-1/6 px-6 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {learningObject &&
                  learningObject.map((i) => {
                    return (
                      <tr
                        className="bg-white hover:bg-gray-50"
                        key={i.learning_id}
                      >
                        <td className="px-6 py-4">{i.learning_title}</td>
                        <td className="px-6 py-4">{i.learning_desc}</td>
                        <td className="px-6 py-4 gap-2 flex flex-col items-center">
                          <button
                            className="font-medium p-2 border rounded-lg w-24 text-violet-600 hover:underline"
                            value={i.learning_id}
                            onClick={(event) =>
                              showUpdateLearning(event.target.value)
                            }
                          >
                            Edit
                          </button>
                          {/* <button
                            className="font-medium p-2 border rounded-lg w-24 text-violet-600 hover:underline"
                            value={i.learning_id}
                            onClick={(event) =>
                              handleDeleteLearning(event.target.value)
                            }
                          >
                            Delete
                          </button> */}
                          <button
                            className="font-medium p-2 border rounded-lg w-24 text-violet-600 hover:underline"
                            value={i.learning_id}
                            onClick={() =>
                              navigate(
                                "/admin/" + classId + "/" + i.learning_id
                              )
                            }
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default AdminLearning;
