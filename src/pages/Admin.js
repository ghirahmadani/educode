import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Alert from "../components/Alert";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);

  const [classObject, setClassObject] = useState([]);
  const [classTitle, setClassTitle] = useState("");
  const [classDesc, setClassDesc] = useState("");
  const [classId, setClassId] = useState(-1);

  const token = localStorage.getItem("token");
  const { handleSubmit } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/class`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setClassObject(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCreate = async () => {
    const form = new FormData();
    form.append("class_title", classTitle);
    form.append("class_desc", classDesc);
    const value = Object.fromEntries(form.entries());

    if (classId === -1) {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/class/new-class`, value, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setIsSuccess(res.data.message);
          setOpen(false);
          loadData();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await axios
        .put(
          `${process.env.REACT_APP_API_URL}/class/update-class?class_id=${classId}`,
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
          setOpen(false);
          loadData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const showUpdateClass = async (classId) => {
    setOpen(true);
    setClassId(classId);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/class/?class_id=${classId}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setClassTitle(res.data.payload.class_title);
        setClassDesc(res.data.payload.class_desc);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (classId) => {
    setClassId(classId);
    await axios
      .delete(
        `${process.env.REACT_APP_API_URL}/class/delete-class?class_id=${classId}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setIsSuccess("Success Delete");
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {!loading ? (
        <div className="w-full h-auto my-20 ">
          {isSuccess && (
            <Alert
              isSuccess={isSuccess}
              handleSuccess={(isSuccess) => {
                setIsSuccess(isSuccess);
              }}
            />
          )}

          <div className="w-11/12 flex justify-between items-center mx-auto my-8">
            <h1 className="text-2xl">Class List</h1>
            {!open && (
              <div className="order-2">
                <button
                  className="bg-gray-100 p-2 px-4 rounded-lg flex items-center hover:bg-gray-200"
                  onClick={() =>
                    setOpen(true) &
                    setClassId(-1) &
                    setClassTitle("") &
                    setClassDesc("")
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
                  New Class
                </button>
              </div>
            )}
          </div>
          {open && (
            <form
              className="w-11/12 flex flex-col mx-auto gap-4 mb-12"
              onSubmit={handleSubmit(handleCreate)}
            >
              <label>Class Title</label>
              <input
                type="text"
                onChange={(event) => setClassTitle(event.target.value)}
                value={classTitle}
                className="border-gray-200 rounded-lg"
              ></input>
              <label>Class Description</label>
              <input
                type="text"
                onChange={(event) => setClassDesc(event.target.value)}
                value={classDesc}
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
                onClick={() => setOpen(false)}
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
                {classObject &&
                  classObject.map((i) => {
                    return (
                      <tr className="bg-white" key={i.class_id}>
                        <td className="px-6 py-4">{i.class_title}</td>
                        <td className="px-6 py-4">{i.class_desc}</td>
                        <td className="flex flex-col px-6 py-4 gap-2 items-center">
                          <button
                            className="font-medium p-2 border rounded-lg w-24 text-violet-600 hover:underline"
                            value={i.class_id}
                            onClick={(event) =>
                              showUpdateClass(event.target.value)
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="font-medium p-2 border rounded-lg w-24 text-violet-600 hover:underline"
                            value={i.class_id}
                            onClick={(event) =>
                              handleDelete(event.target.value)
                            }
                          >
                            Delete
                          </button>
                          <button
                            className="font-medium p-2 border rounded-lg w-24 text-violet-600 hover:underline"
                            value={i.class_id}
                            onClick={() => navigate("/admin/" + i.class_id)}
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
        <div className="fixed top-[300px] mx-auto w-full">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Admin;
