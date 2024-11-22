import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useLogin } from "../context/LoginContext";

const BEHOST = import.meta.env.VITE_BELC;

const socket = io(BEHOST, {
  withCredentials: true,
});

const ChatBox = (props) => {
  const { selectedUserId, selectedUser, handleclose, openchatbox } = props;
  const { loginInfo } = useLogin();
  const loggedInUserId = loginInfo.userId;
  const [messages, setMessages] = useState([]);
  const [down, setDown] = useState(false);
  const [pastmessages, setPastMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messageEndRef = useRef(null);

  const handleInput = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      const messageData = {
        senderId: loggedInUserId,
        receiverId: selectedUserId,
        message: newMessage,
        timestamp: new Date().toISOString(),
      };
      socket.emit("message", messageData);
      setNewMessage("");
    }
  };

  useEffect(() => {
    // associate user and load past messages
    socket.emit("user_connected", loggedInUserId);
    socket.emit("fetch_past_messages", selectedUserId);

    // listen for past messages on connection
    socket.on("past_messages", (pastMessages) => {
      setDown(true);
      setPastMessages(
        pastMessages.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        )
      );
    });

    socket.on("message", (receivedMessage) => {
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    });

    // clean up the listeners on component unmount
    return () => {
      socket.off("message");
      socket.off("past_messages");
    };
  }, [selectedUserId, loggedInUserId]);

  // sort messages by timestamp for accurate display
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, down]);

  return (
    <div className="flex flex-col w-full fixed bottom-0 md:right-1/4 overflow-y-auto overflow-x-hidden max-w-md p-6 bg-gray-100 dark:bg-gray-600 rounded-lg shadow-md">
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
        {pastmessages.map((msg, index) => {
          return (
            <div
              key={index}
              className={`my-1 p-2 rounded-lg ${
                msg.sender_id == loggedInUserId
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-300 text-black self-start"
              }`}
            >
              {msg.message}
            </div>
          );
        })}
        {sortedMessages.map((msg, index) => {
          return (
            <div
              key={index}
              className={`my-1 p-2 rounded-lg ${
                msg.senderId == loggedInUserId
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-300 text-black self-start"
              }`}
            >
              {msg.message}
            </div>
          );
        })}
        <div ref={messageEndRef} />
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
