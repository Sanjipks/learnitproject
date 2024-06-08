import React, { useEffect } from "react";
import { useState } from "react";

export default function UserListView(props) {
  const [expand, setExpand] = useState("hidden");

  const handleExpand = () => {
    if (expand === "hidden") {
      setExpand("block");
    } else {
      setExpand("hidden");
    }
  };

  const handleMouseLeave = () => {
    setExpand("hidden");
  };

  const handleDelete = () => {
    props.removeUser(user.userId);
    setExpand("hidden");
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="p-4 bg-white dark:bg-gray-900">
        <label for="table-search" className="sr-only">
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              SN
            </th>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              User Name
            </th>
            <th scope="col" className="px-6 py-3">
              User Image
            </th>
            <th scope="col" className="px-6 py-3">
              User Email
            </th>
            <th scope="col" className="px-6 py-3">
              User Role
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {props.totalusers.map((user, id) => (
            <tr
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
              key={id}
            >
              <td className="px-6 py-4">
                {props.totalusers.indexOf(user) + 1}
              </td>
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-3"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-table-3" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {user.user_name}
              </th>
              <th
                scope="row"
                className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src="/docs/images/people/profile-picture-3.jpg"
                  alt="Jese image"
                />
              </th>
              <td className="px-6 py-4">{user.user_email}</td>
              <td className="px-6 py-4">{user.role}</td>
              <td className="px-6 py-4">
                <a
                  onClick={handleDelete}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    // <div className="flex">
    //   <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    //     <div
    //       className="flex justify-start px-4 pt-4"
    //       onMouseLeave={handleMouseLeave}
    //     >
    //       <button
    //         onClick={handleExpand}
    //         id="dropdownButton"
    //         data-dropdown-toggle="dropdown"
    //         className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
    //         type="button"
    //       >
    //         <span className="sr-only">Open dropdown</span>
    //         <svg
    //           className="w-5 h-5"
    //           aria-hidden="true"
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="currentColor"
    //           viewBox="0 0 16 3"
    //         >
    //           <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
    //         </svg>
    //       </button>

    //       <div
    //         id="dropdown"
    //         className={`z-10 ${expand} absolute ml-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
    //       >
    //         <ul className="py-2" aria-labelledby="dropdownButton">
    //           <li>
    //             <a
    //               href="#"
    //               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    //             >
    //               Edit
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    //             >
    //               Export Data
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               onClick={handleDelete}
    //               className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    //             >
    //               Delete
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //     <div className="flex flex-col items-center pb-10">
    //       <img
    //         className="w-48 h-48 mb-3 mt-10 rounded-full shadow-lg"
    //         src={props.image}
    //         alt="Bonnie image"
    //       />
    //       <div className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
    //         {props.user}
    //         <p className="mb-1 xl:text-xl lg:text-lg md:text-sm font-medium text-gray-900 dark:text-white">
    //           {props.userEmail}
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // <>
    //   <td className="w-20 text-center">{props.sn}</td>
    //   <td className="w-60 text-left pl-10">{props.user}</td>
    //   <td className="w-80 text-left">{props.userEmail}</td>
    //   <td className="w-40 text-center">{props.userId}</td>

    //   <td className="w-40 text-center">
    //     <a
    //       href="#"
    //       className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    //     >
    //       Edit
    //     </a>
    //   </td>
    // </>
  );
}
