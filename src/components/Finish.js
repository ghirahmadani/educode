import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Happy from '../assets/chara.gif'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from './Loading'

const Finish = () => {
  const { classId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {;
    loadLearning();
  }, []);

  const [loading, setLoading] = useState(true)
  const [learningTitle, setLearningTitle] = useState("");
  const { learningId } = useParams();

  const token = localStorage.getItem("token");

  const loadLearning = async () => {
    setLoading(true)
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
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center overflow-hidden bg-white pt-24 md:pt-48 pb-44">
    {!loading ?
    <div className="flex flex-col container w-full md:w-1/3 px-4 md:px-0 gap-y-2 items-center justify-center">
      <div className="px-6 md:p-10 my-28 md:my-6 w-full md:w-10/12 mx-auto flex flex-col gap-6 justify-center items-center h-96">
          <img src={Happy} alt="Character" className="w-48"></img>
          <h1 className='text-sm md:text-lg'>Lesson Completed!</h1>
          <p className="text-center text-sm font-normal mb-4 rounded-full px-4">You're doing great job!<br/>Kamu berhasil menyelesaikan lesson <span className='lowercase'>{learningTitle}.</span></p>
          <div className="p-4 py-8 rounded-xl flex flex-col gap-4 bg-gradient-to-r from-yellow-50 to-pink-50 bg-opacity-20 backdrop-blur-xl">
            <p className="text-sm font-bold text-center">Reference</p>
            <p className="text-xs">Novianto, Andi. 2018. Pemrograman Dasar. Jakarta: Erlangga.</p>
            <p className="text-xs">Kadir, Abdul. 2020. Logika Pemrograman Java. Jakarta: Elex Media.</p>
            <p className="text-xs">Suprapto. 2008. Bahasa Pemrograman untuk Sekolah Menengah Kejuruan. Jakarta: Direktorat Pembinaan.</p>
          </div>
          <button type="button"className="text-white bg-violet-400 font-medium rounded-lg text-sm px-6 py-2 text-center transition ease-in-out delay-150 hover:-translate-y-0 hover:scale-110 hover:bg-grey-100 duration-300"
                onClick={() => navigate('/home/class/' + classId )}>Continue Learning</button>
      </div>
    </div>:<Loading/>
    }
    </div>
  )
}

export default Finish