import Head from "next/head";
import React from "react";
import PublicRoute from "../components/accessControl/PublicRoute";
import { useAuth } from "../contexts/AuthContextProvider";

const RegisterPage = () => {
  const { register } = useAuth();
  const formSubmit = (e) => {
    e.preventDefault();
    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
      role: e.target.role.value,
    };
    console.log(formData);
    register(formData);
  };
  return (
    <PublicRoute>
      <div className="mt-20 max-w-2xl mx-auto flex justify-center items-center">
        <Head>
          <title>Register</title>
        </Head>
        <div className="bg-white p-6 rounded shadow-md">
          <h1 className="text-3xl font-semibold">Create new account!</h1>
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
                    required
                    type="password"
                    name="password"
                    placeholder="Your  user name"
                    className="border outline-none focus:ring-indigo-400 focus:ring-1 block w-full p-3 rounded"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="password" className="font-medium text-sm">
                    Role
                  </label>
                  <select className="p-3 border outline-none" name="role">
                    <option value="admin">Admin</option>
                    <option value="edtior">Editor</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button className="bg-indigo-600 text-white p-4 rounded block w-48 text-center hover:bg-indigo-500 transition-all">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PublicRoute>
  );
};

export default RegisterPage;
