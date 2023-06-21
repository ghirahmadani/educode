import React from "react";

import { Link} from "react-router-dom";
import { useState } from "react";

const Register = () => {

  // const [nama, setNama] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  const [data, setData] = useState({
    nama: "",
    email: "",
    password: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nama = data.nama;
    const email = data.email;
    const password = data.password;
  }

  return (
    <section className="bg-white">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto my-36">
        <div className="w-full bg-white rounded-lg shadow  max-w-md">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="flex justify-items-start text-xl font-bold leading-tight tracking-tight text-gray-900">
              Create account
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="your name"
                  value={data.nama}
                  onChange={(e) => setData({...data, nama:e.target.value})}
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" autoComplete="current-username"
                  placeholder="name@company.com"
                  value={data.email}
                  onChange={(e) => setData({...data, email:e.target.value})}
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" autoComplete="current-password"
                  value={data.password} 
                  onChange={(e) => setData({...data, password:e.target.value})}
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
