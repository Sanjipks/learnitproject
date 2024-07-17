import React, { useEffect, useState } from "react";
import { bufferToBase64 } from "../utility/BufferToBase64";

const Service = (props) => {
  const { service, serviceId, serviceLogo } = props;
  const [image, setImage] = useState(null);
  const [expand, setExpand] = useState("hidden");

  useEffect(() => {
    if (serviceLogo && serviceLogo.data) {
      const base64String = bufferToBase64(serviceLogo.data);
      console.log("base", base64String);
      setImage(`data:image/jpeg;base64,${base64String}`);
    }
  }, [serviceLogo]);

  console.log("image", image);

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
    setExpand("hidden");
  };
  const handleEdit = () => {
    "todo";
  };
  return (
    <div className="flex">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div
          className="flex justify-start px-4 pt-4"
          onMouseLeave={handleMouseLeave}
        >
          <button
            onClick={handleExpand}
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

          <div
            id="dropdown"
            className={`z-10 ${expand} absolute ml-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
          >
            <ul className="py-2" aria-labelledby="dropdownButton">
              <li>
                <a
                  onClick={handleEdit}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Edit
                </a>
              </li>

              <li>
                <a
                  onClick={handleDelete}
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-48 h-48 mb-3 mt-10 rounded-full shadow-lg"
            src={image ? image : "no image"}
            alt="Bonnie image"
          />
          <div className="mb-1 text-xl  min-w-full font-medium text-center text-gray-900 dark:text-white p-4">
            {service}
            <p className="mb-1 xl:text-xl lg:text-lg md:text-sm  text-center font-medium text-gray-900 dark:text-white">
              {serviceId}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
