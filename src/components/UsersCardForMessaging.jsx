import React, { useEffect } from "react";
import { useState } from "react";
import { bufferToBase64 } from "../utility/BufferToBase64";
import { useLogin } from "../context/LoginContext";

export default function UsersForMessaging(props) {
  const { loginInfo } = useLogin();

  const loggedInUserRole = loginInfo.userRole;

  const {
    userId,
    userImage,
    user,
    setExpandeduser,
    setExpandeduserId,
    setOpenchatbox,
    connStatus,
  } = props;

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (userImage && userImage.data) {
      const base64String = bufferToBase64(userImage.data);
      setImage(`data:image/jpeg;base64,${base64String}`);
    }
  }, [userImage]);

  // const handleExpand = (id, username) => {
  //   if (expand === "hidden" && expandeduserId === null) {
  //     setExpand("block");
  //     setExpandeduserId(id);
  //     setExpandeduser(username);
  //   } else {
  //     setExpand("hidden");
  //     setExpandeduserId(null);
  //     setExpandeduser(null);
  //     setOpenchatbox(false);
  //   }
  // };

  const handleOpenChatbox = (id, user) => {
    setOpenchatbox((prev) => !prev);
    setExpandeduserId(id);
    setExpandeduser(user);
  };

  return (
    <>
      {loggedInUserRole === "user" && (
        <div className="w-96 mr-2 bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div
            className="flex w-full flex-row  items-center p-1 mx-auto"
            onClick={() => handleOpenChatbox(userId, user)}
          >
            <img
              className="w-12 h-12 mb-3 mr-10 rounded-full shadow-lg"
              src={image}
              alt="Bonnie image"
            />
            <div className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {user}
            </div>

            {/* <div className="block px-16 py-2 text-sm text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                chat
              </div> */}
          </div>
        </div>
      )}
    </>
  );
}
