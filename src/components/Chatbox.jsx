import React, { useState } from "react";
import CloseIcon from "../assets/icons/CloseIcon";

import ChatBoxMessages from "./ChatBoxMessages";

const ChatBox = (props) => {
  const { userImage, user, userId } = props;

  const [minimizeChatBox, setMinimizeChatBox] = useState(false);
  const [closeChatBox, setCloseChatBox] = useState(true);
  const [newMessage, setNewMessage] = useState("");

  const handleMouseLeave = () => {};

  const handleMinimizeChatBox = () => {
    setMinimizeChatBox((prev) => !prev);
  };

  const handleClose = () => {
    setCloseChatBox(false);
  };
  const handleInput = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div
      onMouseLeave={handleMouseLeave}
      onClick={() => handleSelectUserId(userId)}
      className={` flex-col w-screen ${
        closeChatBox ? "flex" : "hidden"
      }    max-w-md p-2 border border-gray-500 dark:border-gray-400 bg-gray-100 dark:bg-gray-600 rounded-lg shadow-md`}
    >
      <section className="flex justify-between border-b-2 border-gray-500 dark:border-gray-100  mb-1 items-start">
        <div className="flex flex-row">
          <img
            className="w-12 h-12 m-1 rounded-full shadow-lg"
            src={userImage ?? userImage}
            alt="Bonnie image"
          />
          <h1 className="px-2">{user}</h1>
        </div>

        <div className="flex flex-row justify-end items-center gap-2">
          <div
            onClick={handleMinimizeChatBox}
            type="button"
            className=" text-gray-700 dark:text-gray-400 bg-transparent  hover:cursor-pointer text-lg hover:text-gray-800 dark:hover:text-gray-200"
          >
            ---
          </div>
          <div
            onClick={handleClose}
            type="button"
            className=" dark:text-gray-400 text-gray-700 bg-transparent  hover:cursor-pointer text-lg hover:text-gray-800 dark:hover:text-gray-200"
          >
            <CloseIcon />
          </div>
        </div>
      </section>
      <section className={`${minimizeChatBox ? "hidden" : "block"}  px-1.5`}>
        <ChatBoxMessages newMessage={newMessage} />

        <div className="flex  mt-2 pb-8">
          <input
            type="text"
            // value={newMessage}
            onChange={handleInput}
            className="flex-1 p-2 border border-gray-300 rounded-md dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message..."
          />
          <button
            // onClick={handleSend}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </section>
    </div>
  );
};

export default ChatBox;
