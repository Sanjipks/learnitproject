import React, { useState } from "react";
import EditUser from "./modals/EditUser";
import { bufferToImage } from "../utility/BufferToImage";

export default function UserListView(props) {
  const {
    allusers,
    removeUser,
    handleSearchInput,
    handlesetuserperpagelistview,
    paginatedUsers,
    usernumber,
    editUser,
  } = props;
  const [expand, setExpand] = useState("hidden");
  const [expandeduser, setExpandeduser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(false);
  const [expandforpagenumber, setExpandforpagenumber] = useState("hidden");

  const handleExpand = (id) => {
    if (expand === "hidden" && expandeduser === null) {
      setExpand("block");
      setExpandeduser(id);
    } else {
      setExpand("hidden");
      setExpandeduser(null);
    }
  };

  const handleExpandForpagenumber = () => {
    if (expandforpagenumber === "hidden") {
      setExpandforpagenumber("block");
    } else {
      setExpandforpagenumber("hidden");
    }
  };

  const handleMouseLeave = () => {
    setExpandforpagenumber("hidden");
    setExpandeduser(null);
  };

  const handleDelete = (id) => {
    removeUser(id);
    setExpand("hidden");
    setExpandeduser(null);
  };

  const handleEditUser = (userId) => {
    setSelectedUser((prev) => !prev);
    editUser(userId);
  };

  const handleClose = () => {
    setSelectedUser(false);
  };

  const handlesetUserPerPage = (number) => {
    handlesetuserperpagelistview(number);
    setExpandforpagenumber("hidden");
  };

  const handleInput = (event) => {
    handleSearchInput(event.target.value);
  };

  return (
    <div className="relative shadow-md border ">
      <div className="p-4 flex flex-row justify-between bg-gray-100 dark:bg-gray-900 border ">
        <div>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              onChange={handleInput}
              type="text"
              id="table-search"
              className="block p-2 ps-10 text-sm  text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>
        </div>
        <div onMouseLeave={handleMouseLeave}>
          <div className="inline-flex items-center text-gray-500 bg-gray-100 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            Number of Users per Page
          </div>
          <button
            onClick={handleExpandForpagenumber}
            id="dropdownActionButton"
            data-dropdown-toggle="dropdownAction1"
            className="inline-flex items-center text-gray-500 bg-gray-100 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
          >
            <span className="sr-only">Action button</span>
            {usernumber}
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

          <div
            id="dropdownAction1"
            className={`z-10 ${expandforpagenumber} absolute  ml-48 px-3 mt-2 bg-gray-100 divide-y divide-gray-100 rounded-lg shadow w-auto dark:bg-gray-700 dark:divide-gray-600`}
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownActionButton"
            >
              <li>
                <a
                  onClick={() => handlesetUserPerPage(5)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  5
                </a>
              </li>
              <li>
                <a
                  onClick={() => handlesetUserPerPage(10)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  10
                </a>
              </li>
              <li>
                <a
                  onClick={() => handlesetUserPerPage(20)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  20
                </a>
              </li>
              <li>
                <a
                  onClick={() => handlesetUserPerPage(40)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  40
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <table className="w-full text-md text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 w-12 border">
              SN
            </th>
            <th scope="col" className="px-6 py-3 border">
              User ID
            </th>
            <th scope="col" className="p-4 w-8 border">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3 w-80 border ">
              User Name
            </th>
            <th scope="col" className="px-6 py-3 w-28 border">
              User Image
            </th>
            <th scope="col" className="px-6 py-3 w-96 border">
              User Email
            </th>
            <th scope="col" className="px-6 py-3 w-20 border">
              User Role
            </th>
            <th scope="col" className="px-6 py-3 w-32 border">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user, id) => (
            <tr
              className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 border"
              key={id}
            >
              <td className="px-6 py-4 border">{allusers.indexOf(user) + 1}</td>
              <td className="px-6 py-4 border">{user.user_id}</td>

              <td className="w-4 p-4 border">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-3"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-table-3" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border"
              >
                {user.user_name}
              </th>
              <th
                scope="row"
                className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={
                    user.user_image?.data
                      ? bufferToImage(user.user_image.data)
                      : "default_image_url_here"
                  }
                  alt={user.user_name || "User image"}
                />
              </th>
              <td className="px-6 py-4 border">{user.user_email}</td>
              <td className="px-6 py-4 border">{user.role}</td>
              <td className="px-6 py-4 border">
                <div className="">
                  <button
                    onClick={() => handleExpand(user.user_id)}
                    id="dropdownActionButton"
                    data-dropdown-toggle="dropdownAction"
                    className="inline-flex items-center text-gray-500 bg-gray-100 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <span className="sr-only">Action button</span>
                    Action
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
                  {expandeduser === user.user_id ? (
                    <div
                      id="dropdownAction"
                      className={`z-10 ${expand} absolute bg-gray-100 divide-y divide-gray-100 rounded-lg shadow mt-2 w-28 dark:bg-gray-700 dark:divide-gray-600`}
                    >
                      <ul
                        className="py-1 text-sm text-gray-700 dark:text-gray-200 "
                        aria-labelledby="dropdownActionButton"
                      >
                        <li>
                          <div
                            onClick={() => handleEditUser(user.user_id)}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Edit
                          </div>
                        </li>

                        <li>
                          <div
                            onClick={() => handleDelete(user.user_id)}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Delete user
                          </div>
                        </li>
                      </ul>
                      <div className="-ml-64">
                        {selectedUser ? (
                          <EditUser handleclose={handleClose} />
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
