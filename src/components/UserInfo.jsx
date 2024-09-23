import React, { useState } from "react";
import { useLogin } from "../context/LoginContext";

function UserInfo() {
  const [expand, setExpand] = useState("hidden");

  const { loginInfo } = useLogin();

  const username = loginInfo.userName;
  const useremail = loginInfo.userEmail;
  console.log("username", username);

  const handleCardClick = () => {
    if (expand === "hidden") {
      setExpand(null);
    } else {
      setExpand("hidden");
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="w-full h-full bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4 pb-10 ">
          <button
            onClick={handleCardClick}
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
          >
            <span className="sr-only">Open dropdown</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns=""
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>

          <div
            id="dropdown"
            className={`absolute mt-10 z-10 ${expand} text-base list-none bg-gray-100 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
          >
            <ul className="py-2" aria-labelledby="dropdownButton">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Edit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Export Data
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex ml-16 min-h-96 flex-col pb-10">
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="block mb-2 mr-4 text-xl font-medium text-gray-900 dark:text-white"
            >
              Name: {username}
            </label>
            <label
              id="useremail"
              className="block text-xl font-medium text-gray-900 dark:text-white"
            >
              Email: {useremail}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
