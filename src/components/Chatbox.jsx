import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useLogin } from "../context/LoginContext";
const BEHOST = import.meta.env.VITE_BELC;

const socket = io(BEHOST, {
  withCredentials: true,
});

const ChatBox = (props) => {
  const { selectedUserId, selectedUser, handleclose, setOpenchatbox } = props;
  const { loginInfo } = useLogin();
  const loggedInUserId = loginInfo.userId;
  const [sentmessages, setSentMessages] = useState([]);
  const [recievedmessages, setReceivedMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [combineMessages, setCombineMessages] = useState([]);

  const handleInput = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      setSentMessages([...sentmessages, { message: newMessage, sender: true }]);
      socket.emit("message", {
        senderId: loggedInUserId,
        receiverId: selectedUserId,
        message: newMessage,
        timestamp: new Date().toISOString(),
      });
      setNewMessage("");
    }
  };

  useEffect(() => {
    socket.on("message", (receivedMessage) => {
      if (receivedMessage.senderId === selectedUserId) {
        setReceivedMessages((prevMessages) => [
          ...prevMessages,
          { message: receivedMessage.message, sender: false },
        ]);
      }
    });

    return () => {
      socket.off("message");
    };
  }, [selectedUserId]);

  useEffect(() => {
    const combined = [...sentmessages, ...recievedmessages];

    const sortedMessages = combined.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    setCombineMessages(sortedMessages);
  }, [sentmessages, recievedmessages]);
  return (
    <div className="flex flex-col w-full fixed bottom-0 md:right-1/4 overflow-y-auto overflow-x-hidden  max-w-md p-6 bg-gray-100 dark:bg-gray-600 rounded-lg shadow-md ">
      <div>
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

      <div className="flex flex-col h-64 overflow-y-auto p-3 bg-white rounded-lg shadow-inner">
        {combineMessages.map((msg, index) => (
          <div
            key={index}
            className={`my-1 p-2 rounded-lg ${
              msg.sender
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-300 text-black self-start"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

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
