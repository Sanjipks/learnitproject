import React from "react";
import ChatBox from "./Chatbox";

import { useChats } from "../context/ChatsContext";

const ChatBoxContainer = () => {
  const { chatContainerItems } = useChats();

  return (
    <div className="flex fixed right-1 w-4/5 overflow-x-scroll bottom-0 ">
      <div className="flex h-auto relative justify-between ">
        {chatContainerItems.map((user) => (
          <div key={user.id} className="flex flex-grow px-1">
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
