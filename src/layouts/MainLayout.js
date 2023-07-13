import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import MainHeader from "../components/header/MainHeader";
import BottomNavigation from "../components/footer/BottomNavigation";

import Chara from "../assets/help.png";
import Loading from "../components/Loading";

const MainLayout = () => {
 
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(null);
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
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setIsError("Sudah login?")
        }
      })
      .finally(() => {
        setLoading(false)
      })
  };

  let layout;

  if(loading){
      layout = <div className="fixed w-full bg-white z-8 mx-auto top-[300px]"><Loading/></div>}
  else{
      layout =
        <div className="transition-opacity duration-300">
          {isError && (
            <div className="relative">
              <div className="fixed inset-0 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 transition-opacity z-10" />
              <div
                className="fixed inset-x-0 mx-auto top-[240px] w-3/12 rounded-lg bg-white text-white shadow-md px-4 py-3 z-20"
                role="alert"
              >
                <h1 className="w-full text-stone-900 font-bold mt-2 text-3xl text-center">
                  {isError}
                </h1>
                <p className="my-2 text-sm text-center text-stone-700 leading-6 tracking-normal">Kalau belum, silahkan login dahulu ya.</p>
                {/* <div className="px-6 py-4 col-span-2 grid place-items-center">
                  <img
                    src={Chara}
                    style={{ display: loading ? "none" : "block" }} 
                    className="h-20 w-max transition ease-in-out hover:scale-105"
                    alt="..."
                  ></img>
                </div> */}
                <span className="flex top-0 bottom-0 right-0 px-4 py-3 justify-center">
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full p-3 rounded-lg bg-violet-600 text-white hover:bg-violet-700"
                  >
                    Login
                  </button>
                </span>
              </div>
            </div>
          )}
          {!isError && !loading?
            <div>
              <MainHeader />
              <main>
                <Outlet />
              </main>
              <BottomNavigation />
            </div> : <></>
          } 
        </div>
  }

  return (
    <div>{layout}</div>
  );
};

export default MainLayout;
