import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useLogin } from "../context/LoginContext";
const BEHOST = import.meta.env.VITE_BELC;

const socket = io(BEHOST);
console.log(socket);

const ChatBox = (props) => {
  const { selectedUserId, selectedUser, handleclose } = props;
  const { loginInfo } = useLogin();
  const loggedInUserId = loginInfo.userId;
  const [sentmessages, setSentMessages] = useState([]);
  const [recievedmessages, setReceivedMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleInput = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      setSentMessages([...sentmessages, newMessage]);
      socket.emit("message", {
        senderId: loggedInUserId,
        receiverId: selectedUserId,
        message: newMessage,
      });
      setNewMessage("");
    }
  };

  useEffect(() => {
    socket.on("message", (newMessage) => {
      setReceivedMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // clean up the effect when the component is unmounted
    return () => {
      socket.off("message");
    };
  }, [socket]);

  return (
    <div className="flex flex-col w-full fixed bottom-0 md:right-1/4 overflow-y-auto overflow-x-hidden  max-w-md p-6 bg-gray-100 dark:bg-gray-600 rounded-lg shadow-md ">
      <div>
        {" "}
        <h1 className="py-2">{selectedUser}</h1>
        <button
          onClick={handleclose}
          type="button"
          className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="popup-modal"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>
      {sentmessages ? (
        <div className="flex flex-col h-64 overflow-y-auto p-3 bg-white rounded-lg shadow-inner">
          {sentmessages &&
            sentmessages.map((msg, index) => (
              <div
                key={index}
                className="my-1 p-2 rounded-lg bg-blue-500 text-white self-start"
              >
                {msg}
              </div>
            ))}
        </div>
      ) : (
        <div className="flex flex-col h-64 overflow-y-auto p-3 bg-white rounded-lg shadow-inner">
          {recievedmessages &&
            recievedmessages.map((msg, index) => (
              <div
                key={index}
                className="my-1 p-2 rounded-lg bg-blue-500 text-white self-start"
              >
                {msg}
              </div>
            ))}
        </div>
      )}

      <div className="mt-4 flex">
        <input
          type="text"
          value={newMessage}
          onChange={handleInput}
          className="flex-1 p-2 border border-gray-300 rounded-md dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
