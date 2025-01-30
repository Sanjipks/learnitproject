import React, { useState } from "react";
import CloseIcon from "../assets/icons/CloseIcon";

import ChatBoxMessages from "./ChatBoxMessages";

import Emoji from "./common/Emoji";

const ChatBotBox = (props) => {
  const { userImage, user, userId, minimizeStatus, chatId } = props;

  const [newMessage, setNewMessage] = useState("");
  const [tempUser, setTempUser] = useState(null);
  const [send, setSend] = useState(false);
  const [emojiSelection, setOpenEmojiSelection] = useState(false);
  const [selectedEmo, setSelectedEmo] = useState("");
  const [fileAttachment, setFileAttachment] = useState(null);

  const handleOnFocus = (id) => {
    setSelectedUserId(id);
  };

  const handleMinimizeChatBox = (chatId) => {
    updateMinimizeStatus(chatId);
  };

  const handleClose = (id) => {
    removeChatboxUserById(id);
  };

  const handleEmojiSelection = () => {
    setOpenEmojiSelection((prev) => !prev);
  };

  const handleInput = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSend = (id) => {
    if (newMessage.trim()) {
      setTempUser();
      setSend(true);
      setOpenEmojiSelection(false);
    }
  };

  const handleAttachFile = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const fileToAttach = event.target.files[0];
      setFileAttachment(fileToAttach);
      setNewMessage((prevMessage) =>
        prevMessage
          ? `${prevMessage} [File: ${fileAttachment.name}]`
          : `[File: ${fileAttachment?.name}]`
      );
    }
  };

  return (
    <div className={`${minimizeStatus === "true" ? "mr-72" : "ml-8"}`}>
      <div
        className={`flex-col  w-screen  ${
          minimizeStatus === "true" ? "h-20 max-w-xs " : " h-auto max-w-md "
        } p-2 border border-gray-500 dark:border-gray-400 bg-gray-100 dark:bg-gray-600 rounded-lg shadow-md fixed bottom-0 right-4 `}
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
              userId={tempUser}
              send={send}
              setSend={setSend}
              attachedFile={fileAttachment}
            />

            <div
              className="flex mt-2 pb-4 border-b-2 "
              onMouseOver={() => handleOnFocus(userId)}
            >
              <input
                type="text, file"
                name="inputBox"
                value={newMessage || selectedEmo}
                onFocus={() => handleOnFocus(userId)}
                onChange={handleInput}
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

        {emojiSelection && (
          <div className="absolute bottom-12 h-auto w-auto z-50 rounded-md bg-gray-200 border border-gray-500">
            <Emoji
              value={selectedEmo}
              setSelectedEmo={setSelectedEmo}
              setOpenEmojiSelection={setOpenEmojiSelection}
            />
          </div>
        )}
        {minimizeStatus === "false" && (
          <div className="flex flex-row gap-2 mx-2 ">
            <button className=" text-3xl h-auto" onClick={handleEmojiSelection}>
              &#128522;
            </button>

            <div className="mt-2">
              <label className="cursor-pointer flex text-3xl items-center gap-2 text-gray-700 hover:text-gray-800">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleAttachFile}
                />
                &#128391;
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBotBox;
