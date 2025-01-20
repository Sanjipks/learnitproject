import React, { useState } from "react";
import CloseIcon from "../assets/icons/CloseIcon";

import ChatBoxMessages from "./ChatBoxMessages";
import { useChats } from "../context/ChatsContext";

const ChatBox = (props) => {
  const { userImage, user, userId, minimizeStatus, chatId } = props;
  const { removeChatboxUserById, updateMinimizeStatus } = useChats();

  const [newMessage, setNewMessage] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(userId);
  const [send, setSend] = useState(false);

  const handleOnFocus = (id) => {
    setSelectedUserId(id);
  };

  const handleMinimizeChatBox = (chatId) => {
    updateMinimizeStatus(chatId);
  };

  const handleClose = (id) => {
    removeChatboxUserById(id);
  };

  const handleInput = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSend = (id) => {
    setSelectedUserId(id);
    setSend((prev) => !prev);
  };

  return (
    <div
      className={` w-screen max-w-md  ${
        minimizeStatus === "true" ? "h-20  fixed bottom-1  " : "flex-col h-auto"
      } p-2 border border-gray-500 dark:border-gray-400 bg-gray-100 dark:bg-gray-600 rounded-lg shadow-md`}
    >
      <section className="flex justify-between h-auto border-b-2 border-gray-500 dark:border-gray-100 mb-1 items-start">
        <div className="flex flex-row">
          <img
            className="w-12 h-12 m-1 rounded-full shadow-lg"
            src={userImage}
            alt={`${user}'s avatar`}
          />
          <h1 className="px-2">{user}</h1>
        </div>

        <div className="flex flex-row justify-end items-center gap-2">
          <div
            onClick={() => handleMinimizeChatBox(chatId)}
            className="text-gray-700 dark:text-gray-400 bg-transparent hover:cursor-pointer text-lg hover:text-gray-800 dark:hover:text-gray-200"
          >
            ---
          </div>
          <div
            onClick={() => handleClose(chatId)}
            className="dark:text-gray-400 text-gray-700 bg-transparent hover:cursor-pointer text-lg hover:text-gray-800 dark:hover:text-gray-200"
          >
            <CloseIcon />
          </div>
        </div>
      </section>

      <section
        className={`${minimizeStatus === "true" ? "hidden" : "block"} px-1.5`}
      >
        <div>
          <ChatBoxMessages
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            selectedUserId={selectedUserId}
            userId={userId}
            send={send}
          />

          <div
            className="flex mt-2 pb-8"
            onMouseOver={() => handleOnFocus(userId)}
          >
            <input
              type="text"
              value={newMessage}
              onFocus={() => handleOnFocus(userId)}
              onChange={(e) => handleInput(e)}
              className="flex-1 p-2 border border-gray-300 rounded-md dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type your message..."
            />

            <button
              onClick={() => handleSend(userId)}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChatBox;
