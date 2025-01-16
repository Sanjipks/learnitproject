import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { openDB } from "idb";

const dbPromise = openDB("ChatContainerDB", 1, {
  upgrade(db) {
    const store = db.createObjectStore("chat", {
      keyPath: "id",
      autoIncrement: true,
    });
    store.createIndex("by-id", "id");
    store.createIndex("by-chatId", "chatId", { unique: true });
  },
});

const ChatsContext = createContext();

export function useChats() {
  return useContext(ChatsContext);
}

export default function ChatsProvider({ children }) {
  const [chatContainerItems, setChatContainerItems] = useState([]);

  useEffect(() => {
    const fetchChatContainerItems = async () => {
      const db = await dbPromise;
      const allItems = await db.getAll("chat");
      setChatContainerItems(allItems);
    };
    fetchChatContainerItems();
  }, []);

  const addChatUser = useCallback(async (chatUser) => {
    const chatUserWithStatus = { ...chatUser, minimizeStatus: false };
    setChatContainerItems((prevItems) => {
      const updatedItems = [...prevItems, chatUserWithStatus];
      return updatedItems;
    });

    const db = await dbPromise;
    const tx = db.transaction("chat", "readwrite");
    const store = tx.objectStore("chat");
    await store.put(chatUserWithStatus);
    await tx.done;
  }, []);

  const removeChatboxUserById = useCallback(
    async (id) => {
      setChatContainerItems((prevItems) => {
        const updatedItems = prevItems.filter((item) => item.userId !== id);
        return updatedItems;
      });

      const db = await dbPromise;
      const tx = db.transaction("chat", "readwrite");
      const store = tx.objectStore("chat");
      await store.delete(id);
      await tx.done;
    },
    [chatContainerItems]
  );

  const clearChatContainer = useCallback(async () => {
    setChatContainerItems([]);
    const db = await dbPromise;
    const tx = db.transaction("chat", "readwrite");
    const store = tx.objectStore("chat");
    await store.clear();
    await tx.done;
  }, []);

  return (
    <ChatsContext.Provider
      value={{
        chatContainerItems,
        addChatUser,
        removeChatboxUserById,
        clearChatContainer,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
}
