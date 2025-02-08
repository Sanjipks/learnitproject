import React, { useEffect, useState } from "react";
import CloseIcon from "../assets/icons/CloseIcon";

import ChatBoxMessages from "./ChatBoxMessages";

import Emoji from "./common/Emoji";
import ChatBotIcon from "../assets/icons/ChatBotIcon";

const ChatBotBox = (props) => {
  const { user } = props;

  const [newMessage, setNewMessage] = useState("");
  const [send, setSend] = useState(false);
  const [emojiSelection, setOpenEmojiSelection] = useState(false);
  const [selectedEmo, setSelectedEmo] = useState("");
  const [fileAttachment, setFileAttachment] = useState(null);
  const [minimize, setMinimize] = useState(true);
  const [closeChatBox, setCloseChatBox] = useState(false);
  const [tempUserId, setTempUserId] = useState(() => {
    return localStorage.getItem("tempUserId" || null);
  });

  useEffect(() => {
    if (!tempUserId) {
      const randomId = Math.floor(987 + Math.random() * 1000000);
      setTempUserId(randomId);
      localStorage.setItem("tempUserId", randomId);
    }
  }, [tempUserId]);

  const handleMinimizeChatBox = () => {
    setMinimize((prev) => !prev);
  };

  const handleClose = () => {
    setCloseChatBox(true);
  };

  const handleEmojiSelection = () => {
    setOpenEmojiSelection((prev) => !prev);
  };

  const handleInput = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSend = () => {
    if (newMessage.trim()) {
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
    <div
      className={`  w-screen ${closeChatBox ? "hidden" : "flex-col"} ${
        minimize ? "h-20 max-w-xs " : " h-auto max-w-md "
      } p-2 border border-gray-500 dark:border-gray-400 bg-gray-100 dark:bg-gray-600 rounded-lg shadow-md fixed bottom-0 right-4 `}
    >
      <section className="flex justify-between h-auto border-b-2 border-gray-500 dark:border-gray-100 mb-1 items-start">
        <div className="flex flex-row">
          <span className="w-12 h-12 m-1 rounded-full shadow-lg">
            <ChatBotIcon />
          </span>
          <h1 className="px-2">{user}</h1>
        </div>

        <div className="flex flex-row justify-end items-center gap-2">
          <div
            onClick={() => handleMinimizeChatBox()}
            className="text-gray-700 dark:text-gray-400 bg-transparent hover:cursor-pointer text-lg hover:text-gray-800 dark:hover:text-gray-200"
          >
            ---
          </div>
          <div
            onClick={() => handleClose()}
            className="dark:text-gray-400 text-gray-700 bg-transparent hover:cursor-pointer text-lg hover:text-gray-800 dark:hover:text-gray-200"
          >
            <CloseIcon />
          </div>
        </div>
      </section>

      <section className={`${minimize ? "hidden" : "block"} px-1.5`}>
        <div>
          <ChatBoxMessages
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            userId={tempUserId}
            send={send}
            setSend={setSend}
            attachedFile={fileAttachment}
          />

          <div className="flex mt-2 pb-4 border-b-2 ">
            <input
              type="text, file"
              name="inputBox"
              value={newMessage || selectedEmo}
              onChange={handleInput}
              className="flex-1 p-2 border border-gray-300 rounded-md dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type your message..."
            />

            <button
              onClick={() => handleSend()}
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
      {!minimize && (
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
  );
};

export default ChatBotBox;
