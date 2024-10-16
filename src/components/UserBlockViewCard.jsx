import React, { useEffect } from "react";
import { useState } from "react";
import { bufferToBase64 } from "../utility/BufferToBase64";
import EditUser from "./modals/EditUser";
import { useLogin } from "../context/LoginContext";

export default function User(props) {
  const { loginInfo } = useLogin();
  const loggedInUserRole = loginInfo.userRole;

  const {
    removeUser,
    userId,
    userImage,
    user,
    userEmail,
    expandeduser,
    setExpandeduser,
  } = props;
  const [expand, setExpand] = useState("hidden");
  const [popUserEditModel, setPopUserEditModel] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (userImage && userImage.data) {
      const base64String = bufferToBase64(userImage.data);
      setImage(`data:image/jpeg;base64,${base64String}`);
    }
  }, [userImage]);

  const handleExpand = (id) => {
    if (expand === "hidden" && expandeduser === null) {
      setExpand("block");
      setExpandeduser(id);
    } else {
      setExpand("hidden");
      setExpandeduser(null);
      setPopUserEditModel(false);
    }
  };

  const handleMouseLeave = () => {
    if (popUserEditModel === false) {
      setExpand("hidden");
      setPopUserEditModel(false);
    } else {
      setExpand("block");
    }
  };

  const handleDelete = (id) => {
    removeUser(id);
    setExpand("hidden");
  };

  const handleEditUser = () => {
    setPopUserEditModel((prev) => !prev);
  };

  const handleClose = () => {
    setPopUserEditModel(false);
    setExpand("hidden");
    setExpandeduser(null);
  };

  return (
    <>
      {loggedInUserRole === "admin" ? (
        <div className="flex">
          <div className="w-full max-w-sm bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div
              className="flex justify-start px-4 pt-4"
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleExpand(userId)}
                id="dropdownButton"
                data-dropdown-toggle="dropdown"
                className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                type="button"
              >
                <span className="sr-only">Open dropdown</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 3"
                >
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
              </button>
              {expandeduser === userId ? (
                <div
                  id="dropdown"
                  className={`z-10 ${expand} absolute ml-10 text-base list-none bg-gray-100 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                >
                  <ul className="py-2" aria-labelledby="dropdownButton">
                    <li>
                      <a
                        onClick={handleEditUser}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Edit
                      </a>
                    </li>

                    <li>
                      <a
                        onClick={() => handleDelete(userId)}
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
            {popUserEditModel && expandeduser === userId ? (
              <EditUser handleclose={handleClose} />
            ) : null}
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-48 h-48 mb-3 mt-10 rounded-full shadow-lg"
                src={image}
                alt="Bonnie image"
              />
              <div className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {user}
                <p className="mb-1 xl:text-xl lg:text-lg md:text-sm font-medium text-gray-900 dark:text-white">
                  {userEmail}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex">
          <div className="w-full max-w-sm bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div
              className="flex justify-start px-4 pt-4"
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleExpand(userId)}
                id="dropdownButton"
                data-dropdown-toggle="dropdown"
                className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                type="button"
              >
                <span className="sr-only">Open dropdown</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 3"
                >
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
              </button>
              {expandeduser === userId ? (
                <div
                  id="dropdown"
                  className={`z-10 ${expand} absolute ml-10 text-base list-none bg-gray-100 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                >
                  <ul className="py-2" aria-labelledby="dropdownButton">
                    <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                      connect
                    </li>
                    <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                      send Message
                    </li>

                    <li className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                      chat
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
            {popUserEditModel && expandeduser === userId ? (
              <EditUser handleclose={handleClose} />
            ) : null}
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-48 h-48 mb-3 mt-10 rounded-full shadow-lg"
                src={image}
                alt="Bonnie image"
              />
              <div className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {user}
                <p className="mb-1 xl:text-xl lg:text-lg md:text-sm font-medium text-gray-900 dark:text-white">
                  {userEmail}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
