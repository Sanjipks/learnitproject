import React, { useEffect, useState } from "react";
import { bufferToBase64 } from "../utility/BufferToBase64";
import { useLogin } from "../context/LoginContext";
import { getUserInfo } from "../apis/Api";

function UserProfile() {
  const { loginInfo } = useLogin();
  //const rawimage = loginInfo.userImage;
  const username = loginInfo.userName;
  const email = loginInfo.userEmail;
  const [expand, setExpand] = useState("hidden");
  const [userImage, setUserImage] = useState(null);
  // console.log("raw", rawimage);

  // useEffect(() => {
  //   const savedImage = JSON.parse(rawimage);

  //   if (savedImage && savedImage.data) {
  //     console.log("savediiiiiii", savedImage.data);
  //     const base64String = bufferToBase64(savedImage.data);
  //     console.log("saved", base64String);
  //     setUserImage(`data:image/jpeg;base64,${base64String}`);
  //   }
  // }, [rawimage]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await getUserInfo(email);
        const data = await res.json();
        console.log("data", data, res);

        const image = data.userInfo.user_image;
        if (image && image.data) {
          const base64String = bufferToBase64(image.data);
          setUserImage(`data:image/jpeg;base64,${base64String}`);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [email]);

  const handleCardClick = () => {
    if (expand === "hidden") {
      setExpand(null);
    } else {
      setExpand("hidden");
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="w-full h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
            className={`absolute mt-10 z-10 ${expand} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
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
            </ul>
          </div>
        </div>
        <div className="md:min-h-96 flex flex-col items-center pb-10">
          <img
            className="lg:w-96 lg:h-96 mb-3 rounded-full shadow-lg"
            src={userImage}
            alt={`${username}` + "'s profile"}
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {username}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Visual Designer
          </span>
          <div className="flex mt-4 md:mt-6">
            <a
              href="#"
              className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Message
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
