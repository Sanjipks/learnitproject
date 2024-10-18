import React, { useState } from "react";

const ChatBox = () => {
  const [sentmessages, setSentMessages] = useState([]);
  const [recievedmessages, setreceivedMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      setSentMessages([...sentmessages, newMessage]);
      setNewMessage("");
    }
  };

  return (
    <div className=" absolute flex flex-col w-full max-w-md p-6 bg-gray-100 dark:bg-gray-600 rounded-lg shadow-md">
      <div className="flex flex-col h-64 overflow-y-auto p-3 bg-white rounded-lg shadow-inner">
        {sentmessages.length === 0 ? (
          <p className="text-gray-400 text-center">No messages yet...</p>
        ) : (
          sentmessages.map((msg, index) => (
            <div
              key={index}
              className={`my-1 p-2 rounded-lg ${
                sentmessages
                  ? "bg-blue-500 text-white self-start"
                  : "bg-green-500 text-white self-end"
              }`}
            >
              {msg}
            </div>
          ))
        )}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
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
