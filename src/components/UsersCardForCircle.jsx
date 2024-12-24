import React, { useEffect } from "react";
import { useState } from "react";
import { bufferToBase64 } from "../utility/BufferToBase64";
import { useLogin } from "../context/LoginContext";
import { rcvConnectionReq, sendConnectionReq } from "../apis/Api";
import { toast } from "react-toastify";
import { useChatBox } from "../context/ChatBoxContext";

export default function UsersForCircle(props) {
  const { loginInfo } = useLogin();
  const { handleViewChatBox, setSelectedUser, setSelectedUserId } =
    useChatBox();

  const loggedInUserRole = loginInfo.userRole;
  const loggedInUserId = loginInfo.userId;

  const {
    userName,
    userId,
    userImage,
    userEmail,
    setExpandeduser,
    expandeduser,
    expandeduserId,
    setExpandeduserId,
    connStatus,
  } = props;
  const [expand, setExpand] = useState("hidden");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (userImage && userImage.data) {
      const base64String = bufferToBase64(userImage.data);
      setImage(`data:image/jpeg;base64,${base64String}`);
    }
  }, [userImage]);

  const handleExpand = (id, username) => {
    if (expand === "hidden" && expandeduserId === null) {
      setExpand("block");
      setExpandeduserId(id);
      setExpandeduser(username);
    } else {
      setExpand("hidden");
      setExpandeduserId(null);
      setExpandeduser(null);
    }
  };

  const handleOpenChatbox = (id, username) => {
    handleViewChatBox(true);
    setSelectedUserId(id);
    setSelectedUser(username);
    setExpand("hidden");
  };

  const handleConnect = async (requester, targetuser) => {
    try {
      const response = await sendConnectionReq(requester, targetuser);

      const data = await response.json();

      if (response.ok) {
        toast(data.message, { autoClose: 1000 });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setExpand("hidden");
      setExpandeduser(null);
    }
  };

  const handleReceiveConnect = async (requester, targetuser) => {
    try {
      const response = await rcvConnectionReq(requester, targetuser);

      const data = await response.json();

      if (response.ok) {
        toast(data.message, { autoClose: 1000 });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setExpand("hidden");
      setExpandeduser(null);
    }
  };

  const handleSendOfflineMessage = (userId) => {
    "todo";
  };

  return (
    <>
      {loggedInUserRole === "user" && (
        <div className="flex">
          <div className="w-full max-w-sm bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-start px-4 pt-4">
              <button
                onClick={() => handleExpand(userId, userName)}
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
              {expandeduserId === userId && (
                <div
                  id="dropdown"
                  className={`z-10 ${expand} absolute ml-10 text-base list-none bg-gray-100 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                >
                  <ul className="py-2" aria-labelledby="dropdownButton">
                    {connStatus === "send connection" ? (
                      <li
                        onClick={() =>
                          handleConnect(loggedInUserId, expandeduserId)
                        }
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Send Connection
                      </li>
                    ) : connStatus === "connection req received" ? (
                      <li
                        onClick={() =>
                          handleReceiveConnect(loggedInUserId, expandeduserId)
                        }
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        {connStatus}
                      </li>
                    ) : (
                      <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        {connStatus}
                      </li>
                    )}
                    <li
                      onClick={() => handleSendOfflineMessage(loggedInUserId)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      send Message
                    </li>
                    {connStatus === "friend" && (
                      <li
                        onClick={() => handleOpenChatbox(userId, userName)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        chat
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center pb-10">
              <img
                className="w-48 h-48 mb-3 mt-10 rounded-full shadow-lg"
                src={image}
                alt="Bonnie image"
              />
              <div className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {userName}
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
