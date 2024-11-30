import React, { useState, useEffect, createContext, useContext } from "react";

const GChatContext = createContext();

export function useGChat() {
  return useContext(GChatContext); // custom hook for easy access to the context
}

export default function GChatProvider({ children }) {
  const [GChatInfo, setGChatInfo] = useState(() => {
    return {
      groupId: localStorage.getItem("groupId"),
      groupName: localStorage.getItem("groupName"),
      groupMembers: JSON.parse(localStorage.getItem("groupMembers")) || [],
    };
  });

  useEffect(() => {
    localStorage.setItem("groupId", GChatInfo.groupId);
    localStorage.setItem("groupName", GChatInfo.groupName);
    localStorage.setItem(
      "groupMembers",
      JSON.stringify(GChatInfo.groupMembers)
    );
  }, [GChatInfo]);

  const addGroupMember = (member) => {
    setGChatInfo((prev) => ({
      ...prev,
      groupMembers: [...prev.groupMembers, member],
    }));
  };

  const removeGroupMember = (memberId) => {
    setGChatInfo((prev) => ({
      ...prev,
      groupMembers: prev.groupMembers.filter(
        (member) => member.id !== memberId
      ),
    }));
  };

  const clearGroupMembers = () => {
    setGChatInfo((prev) => ({
      ...prev,
      groupMembers: [],
    }));
  };

  return (
    <GChatContext.Provider
      value={{
        GChatInfo,
        setGChatInfo,
        addGroupMember,
        removeGroupMember,
        clearGroupMembers,
      }}
    >
      {children}
    </GChatContext.Provider>
  );
}
