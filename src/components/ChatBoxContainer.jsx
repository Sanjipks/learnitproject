import React from "react";
import ChatBox from "./Chatbox";

import { useChats } from "../context/ChatsContext";

const ChatBoxContainer = () => {
  const { chatContainerItems } = useChats();

  return (
    <div className="flex right-1 w-4/5 h-auto overflow-x-scroll fixed  border-gray-200 ">
      <div className="flex flex-row justify-between bottom-0 fixed gap-96  ">
        {chatContainerItems.map((user) => (
          <div
            key={user.id}
            className="flex flex-grow overflow-x-scroll px-12 py-2  z-10  "
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
