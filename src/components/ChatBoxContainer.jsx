import React from "react";
import ChatBox from "./Chatbox";

import { useChats } from "../context/ChatsContext";

const ChatBoxContainer = () => {
  const { chatContainerItems } = useChats();
  console.log("chatConta", chatContainerItems);

  return (
    <div className="flex w-4/5 h-auto overflow-x-scroll float-right border-gray-200 bottom-0 right-1 z-10 fixed">
      <div className="flex flex-row ">
        {chatContainerItems.map((user) => (
          <div key={user.user_id} className="flex justify-between px-2 py-2">
            <ChatBox
              key={user.userId}
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
