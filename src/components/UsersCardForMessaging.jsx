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
    pastMessages,
  } = props;

  console.log(connStatus);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (userImage && userImage.data) {
      const base64String = bufferToBase64(userImage.data);
      setImage(`data:image/jpeg;base64,${base64String}`);
    }
  }, [userImage]);

  const handleOpenChatbox = (id, user) => {
    setOpenchatbox((prev) => !prev);
    setExpandeduserId(id);
    setExpandeduser(user);
  };

  return (
    <>
      {loggedInUserRole === "user" && (
        <div className="w-96 sticky mr-2 bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          {/* {connStatus === "friend" && ( */}
          <div
            className="flex w-full flex-row  items-center p-1 mx-auto"
            onClick={() => handleOpenChatbox(userId, user)}
          >
            <img
              className="w-12 h-12 my-2 mr-1 rounded-full shadow-lg"
              src={image}
              alt="Bonnie image"
            />
            <div className="mb-10  text-sm font-medium text-gray-900 dark:text-white">
              {user}
            </div>
            <div className="mt-6 ml-14 absolute w-80 h-10 border border-gray-900 text-sm font-medium rounded-sm  bg-gray-100 text-gray-900 ">
              {" "}
              {pastMessages.map((msg, index) => {
                return (
                  <div key={index} className=" p-2 text-black self-start">
                    {msg.message}
                  </div>
                );
              })}
            </div>
          </div>
          {/* )} */}
        </div>
      )}
    </>
  );
}
