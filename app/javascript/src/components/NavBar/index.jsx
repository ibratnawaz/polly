import React from "react";
import { isNil } from "ramda";
import { Link } from "react-router-dom";

import NavItem from "./NavItem";
import authApi from "apis/auth";
import { resetAuthTokens } from "src/apis/axios.js";
import { getFromLocalStorage, clearLocalStorage } from "helpers/storage";

const NavBar = () => {
  const userName = getFromLocalStorage("authUserName");

  const handleLogout = async () => {
    try {
      await authApi.logout();
      clearLocalStorage();
      resetAuthTokens();
      window.location.href = "/login";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <nav className="bg-white shadow">
      <div className="container px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <div className="hidden lg:flex">
              <NavItem name="Polly" path="/" />
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-4">
            <span
              className="inline-flex items-center px-2 pt-1 text-sm font-regular leading-5 text-bb-gray-600
              text-opacity-50 transition duration-150 ease-in-out border-b-2 border-transparent focus:outline-none
              focus:text-bb-gray-700"
            >
              {userName}
            </span>
            {isNil(userName) ? (
              <Link
                to="/login"
                className="inline-flex items-center px-1 pt-1 text-base font-semibold leading-5 text-bb-gray-600 text-opacity-50 transition duration-150 ease-in-out border-b-2 border-transparent hover:text-bb-gray-600 focus:outline-none focus:text-bb-gray-700 cursor-pointer"
              >
                Login
              </Link>
            ) : (
              <a
                onClick={handleLogout}
                className="inline-flex items-center px-1 pt-1 text-base font-semibold leading-5 text-bb-gray-600 text-opacity-50 transition duration-150 ease-in-out border-b-2 border-transparent hover:text-bb-gray-600 focus:outline-none focus:text-bb-gray-700 cursor-pointer"
              >
                Logout
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
