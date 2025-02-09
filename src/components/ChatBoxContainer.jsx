import React, { useState, useEffect } from "react";
import ChatBox from "./Chatbox";

import { useChats } from "../context/ChatsContext";

const ChatBoxContainer = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const { chatContainerItems } = useChats();
  let delay = 200;

  useEffect(() => {
    if (visibleCount < chatContainerItems.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prevCount) => prevCount + 1);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, chatContainerItems.length]);

  return (
    <div className="flex fixed right-1 w-4/5 overflow-x-scroll bottom-0 ">
      <div className="flex h-auto relative justify-between ">
        {chatContainerItems.slice(0, visibleCount).map((user) => (
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
