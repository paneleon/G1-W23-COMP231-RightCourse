import React from "react";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContextProvider";

const NavBar = () => {
  const { authState, logOut } = useAuth();
  const { user, isAuthReady } = authState;
  console.log(user);
  return (
    <nav>
      <ul className="flex justify-between items-center">
        <div className="flex space-x-4 items-center">
          <li>
            <Link href="/">
              <a className="font-bold text-xl">RightCourse</a>
            </Link>
          </li>
        </div>
        {isAuthReady && !user && (
          <div className="flex space-x-4 items-center">
            <li>
              <Link href="/login">
                <a className="p-3 bg-indigo-600 text-white rounded w-24 block text-center">
                  Login
                </a>
              </Link>
            </li>
            <li>
              <Link href="/register">
                <a className="p-3 bg-indigo-100 rounded w-24 block text-center">
                  Register
                </a>
              </Link>
            </li>
          </div>
        )}

        {isAuthReady && user && (
          <div className="flex space-x-2 items-center">
            <div>
              User name:{" "}
              <strong>
                {user.username} - Role: {user.role}
              </strong>
            </div>

            <button className="bg-rose-300 p-3 rounded" onClick={logOut}>
              Logout
            </button>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
