import React from "react";
import ChatBox from "./Chatbox";

import { useChats } from "../context/ChatsContext";

const ChatBoxContainer = () => {
  const { chatContainerItems } = useChats();

  return (
    <div className="flex w-4/5 h-auto overflow-x-scroll border-gray-200 bottom-0 right-1 z-10 fixed">
      <div className="flex flex-row bottom-0 ">
        {chatContainerItems.map((user) => (
          <div
            key={user.id}
            className="flex flex-row justify-between justify-items-end px-2 py-2 z-10 relative "
          >
            <ChatBox
              chatId={user.id}
              user={user.userName}
              userId={user.userId}
              userImage={user.image}
              minimizeStatus={user.minimizeStatus}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBoxContainer;
