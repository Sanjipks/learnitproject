import React from "react";
import ChatBox from "./Chatbox";

import { useChats } from "../context/ChatsContext";

const ChatBoxContainer = () => {
  const { chatContainerItems } = useChats();

  console.log(chatContainerItems);

  return (
    <div className="flex w-4/5 h-2/6 float-right border border-gray-200 bottom-1 right-1 z-20 fixed">
      <h1>Chat Box</h1>
      <div className="flex">
        {chatContainerItems.map((user) => (
          <div key={user.user_id} className="flex justify-between px-4 pt-4">
            <ChatBox
              key={user.user_id}
              user={user.user_name}
              userId={user.user_id}
              userImage={user.user_image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBoxContainer;
