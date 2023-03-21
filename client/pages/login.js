import Head from "next/head";
import React from "react";
import PublicRoute from "../components/accessControl/PublicRoute";
import { useAuth } from "../contexts/AuthContextProvider";

const LoginPage = () => {
  const { login } = useAuth();
  const formSubmit = (e) => {
    e.preventDefault();
    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    console.log(formData);
    login(formData);
  };
  return (
    <PublicRoute>
      <div className="mt-20 max-w-2xl mx-auto flex justify-center">
        <Head>
          <title>Login</title>
        </Head>
        <div className="bg-white p-6 rounded shadow-md">
          <h1 className="text-3xl font-semibold">Join in!</h1>
          <p className="text-slate-700 mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In, libero!
          </p>
          <div className="mt-6">
            <form onSubmit={formSubmit}>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="username" className="font-medium text-sm">
                    User Name
                  </label>
                  <input
                    required
                    type="text"
                    name="username"
                    placeholder="Your  user name"
                    className="border outline-none focus:ring-indigo-400 focus:ring-1 block w-full p-3 rounded"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="password" className="font-medium text-sm">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    name="password"
                    placeholder="Your  password"
                    className="border outline-none focus:ring-indigo-400 focus:ring-1 block w-full p-3 rounded"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button className="bg-indigo-600 text-white p-4 rounded block w-48 text-center hover:bg-indigo-500 transition-all">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PublicRoute>
  );
};

export default LoginPage;
