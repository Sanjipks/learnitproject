import React, { useState } from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  const [expand, setExpand] = useState("hidden");
  const [subExpand, setSubExpand] = useState("hidden");

  const handleExpandMenu = () => {
    if (expand === "hidden") {
      setExpand("");
    } else {
      setExpand("hidden");
    }
  };

  const handleExpandSubMenu = () => {
    if (subExpand === "hidden") {
      setSubExpand("block");
    } else {
      setSubExpand("hidden");
    }
  };

  const handleMouseLeave = () => {
    setExpand("hidden");
    setSubExpand("hidden");
  };

  const handleMainMenuClick = () => {
    setExpand("hidden");
  };

  const handleSubMenuClick = () => {
    setExpand("hidden");
    setSubExpand("hidden");
  };

  const loginUpdate = () => {
    localStorage.clear();
    setExpand("hidden");
    setSubExpand("hidden");
  };

  return (
    <nav
      className="sticky top-0 z-50 bg-white dark:bg-gray-900 dark:border-gray-700 border-b border-gray-200"
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-5">
        {/* <nav className = "fixed top-0 z-50 bg-gray-300 border-gray-200 dark:bg-gray-900 dark:border-gray-700">
  <div className="max-w-screen-xl flex flex-wrap  items-center justify-between mx-auto p-5"> */}

        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          {/* <img src="" className="h-8 dark:text-white mx-4" alt="Logo" /> */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900 dark:text-white">
            LearnIT
          </span>
        </Link>

        <DarkModeToggle />
        <button
          onClick={handleExpandMenu}
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${expand} w-full md:block md:w-auto lg:static sm:mt-0 md:mt-0 md:ml-0`}
          id="navbar-dropdown"
        >
          <ul className="flex flex-col overflow-hidden font-medium p-4 md:p-0 mt-4 border border-gray-300 sm:rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-900">
            <li>
              <Link
                onClick={handleMainMenuClick}
                to="/home"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Home
              </Link>
            </li>

            {localStorage.getItem("loginState") === null &&
            localStorage.getItem("userRole") === null ? (
              <li>
                <Link
                  onClick={handleMainMenuClick}
                  to="/about"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About
                </Link>
              </li>
            ) : null}
            <li>
              <Link
                onClick={handleMainMenuClick}
                to="/services"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                onClick={handleMainMenuClick}
                to="/contact-us"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Contact Us
              </Link>
            </li>
            <li className="static">
              {localStorage.getItem("userRole") === "user" ? (
                <div>
                  <button
                    id="dropdownNavbarLink"
                    onClick={handleExpandSubMenu}
                    data-dropdown-toggle="dropdownNavbar"
                    className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                  >
                    More{" "}
                    <svg
                      className="w-2.5 h-2.5 ms-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                </div>
              ) : null}

              {/* <!-- Dropdown menu --> */}
              <div
                id="dropdownNavbar"
                className={`z-10 ${subExpand} w-80 md:-ml-56 fixed mt-5 sm:rounded-lg font-normal bg-white divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-800`}
              >
                <ul
                  className="flex flex-col mx-0 pr-5 text-sm text-gray-900 dark:text-gray-200"
                  aria-labelledby="dropdownLargeButton"
                >
                  {localStorage.getItem("loginState") === "true" &&
                  localStorage.getItem("userRole") === "admin" ? (
                    <div className="py-1">
                      <li>
                        <Link
                          to="/userlist"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          User List
                        </Link>
                      </li>
                    </div>
                  ) : null}
                  {localStorage.getItem("loginState") === "true" ? (
                    <div className="py-1">
                      <li>
                        <Link
                          onClick={handleSubMenuClick}
                          to="/progress"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Progress
                        </Link>
                      </li>
                    </div>
                  ) : null}
                </ul>

                {localStorage.getItem("loginState") === "true" ? (
                  <div className="py-1">
                    <Link
                      onClick={loginUpdate}
                      to="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Log out
                    </Link>
                  </div>
                ) : null}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
