import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const MainSection = () => {
  const [classObject, setClassObject] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    reloadPage();
  }, []);

  const reloadPage = async () => {
    setLoading(true)
    const token = localStorage.getItem("token");
    await axios
      .get(`${process.env.REACT_APP_API_URL}/class`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setClassObject(res.data.payload)
      })
      .catch((err) => {
        if (err) {
          console.log(err)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  };

  return (
    <div className="container px-6 md:p-20 my-28 md:my-20 w-full md:w-10/12 mx-auto">
    {!loading?
    <div>
      <h1 className="flex justify-left items-center font-extrabold">
        <svg fill="none" stroke="currentColor" className="w-4 h-4 mr-2 text-stone-900" strokeWidth={2.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
        Class Category
      </h1>
      <div className="border border-stone-900 border-b-1 mt-2 md:mt-5"></div>
        <div className="grid grid-cols-1 gap-4 md:gap-10 my-6 md:my-10">
          {classObject && classObject.map((i) => {
            return (
              <button onClick={() => navigate('' + i.class_id)} className="flex justify-center" key={i.class_id}>
                <div className="flex justify-start items-center w-full h-32 md:h-36 p-6 md:p-10 rounded-lg border border-b-gray-200 border-b-4 hover:border-b-violet-600 hover:border-b-[6px] transition ease-in-out hover:shadow-sm">
                  <div className="order-2">
                    <h1 className="text-left font-bold text-lg md:text-xl mb-1 md:mb-2">
                      {i.class_title}
                    </h1>
                    <p className="text-left text-xs md:text-sm text-stone-700">{i.class_desc}</p>
                  </div>
                  <div className="order-1 mr-6 ml-2 md:ml-0 md:mr-12">
                  <div className="flex w-10 h-10 md:w-16 md:h-16 rounded-full bg-violet-600 items-center justify-center">
                    <svg
                      className="text-white w-4 h-4 md:w-10 md:h-10"
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
              </button>
            );
          })}
        </div>
    </div> : <Loading/>
    }
    </div>
  );
};

export default MainSection;
