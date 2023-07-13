import React from "react";

import { Link} from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Alert from "./Alert";

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSuccess, setIsSuccess] = useState(null);

  const { handleSubmit } = useForm();

  const onSubmit = async() => {

    const form = new FormData();
    form.append("name", name)
    form.append("username", email)
    form.append("password", password)
    const value = Object.fromEntries(form.entries());

    await axios
    .post(`${process.env.REACT_APP_API_URL}/auth/register`, value,
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((res) => {
      setIsSuccess(res.data.message)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <section className="bg-white">

      {
        isSuccess && 
          <Alert isSuccess={isSuccess} handleSuccess={(isSuccess) => {setIsSuccess(isSuccess)}}/>
      }

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto my-36">
        <div className="w-full bg-white rounded-lg sm:shadow max-w-md">

          <div className="p-6 space-y-4">
            <h1 className="flex justify-items-start text-xl font-bold leading-tight tracking-tight text-gray-900">
              Create account
            </h1>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
              <label
                htmlFor="nama"
                className="flex justify-items-start mb-2 text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <input
                type="text"
                name="nama"
                id="nama"
                onChange={(event) => setName(event.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
              </div>
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" autoComplete="current-username"
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
                  onChange={(event) => setPassword(event.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" autoComplete="current-password"
                  required
                />
              </div>          
              <button
                type="submit"
                className="w-full text-white transition-all bg-violet-400 hover:bg-violet-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link to='/login'
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
          
        </div>
      </div>

    </section>
  );
};

export default Register;
