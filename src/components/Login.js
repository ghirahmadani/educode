import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const { handleSubmit } = useForm();

  const navigate = useNavigate();

  const onSubmit = async() => {
    setIsPending(true)
    const form = new FormData();

    form.append("username", email)
    form.append("password", password)

    const value = Object.fromEntries(form.entries());

    await axios
    .post(`${process.env.REACT_APP_API_URL}/auth/login`, value,
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((res) => {
      setIsSuccess(res.data.message)
      localStorage.setItem("token", res.data.payload.token)
      navigate('/home')
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      setIsPending(false)
    })
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto my-36">
      {
        isSuccess && 
          <div className="relative">        
              <div className="fixed inset-x-0 mx-auto top-[150px] w-10/12 rounded-lg bg-[#499e86] border text-white px-4 py-3 z-10" role="alert">
                  <span className="block sm:inline">
                      {isSuccess}
                  </span>
                  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                      <svg
                      onClick={() => setIsSuccess(null)}
                      className="fill-current h-6 w-6 text-white"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      >
                      <title>Close</title>
                      <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                      </svg>
                  </span>
              </div>
          </div>
      }
      
      <div className="w-full bg-white rounded-lg sm:shadow max-w-md">
        <div className="p-6 space-y-4">
          <h1 className="flex justify-items-start text-xl font-bold leading-tight tracking-tight text-gray-900">
            User login
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="flex justify-items-start mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(event) => setEmail(event.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="flex justify-items-start mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                onChange={(event) => setPassword(event.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
            
            { !isPending?
            <button
              type="submit"
              className="w-full text-white bg-violet-400 hover:bg-violet-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>:
            <button
            type="submit"
            className="w-full text-white bg-violet-400 hover:bg-violet-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Loading . . .
          </button>
            }
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <Link to='/register'
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
