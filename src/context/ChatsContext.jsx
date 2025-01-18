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
    store.createIndex("by-userId", "userId", { unique: true });
  },
});

const ChatsContext = createContext();

export function useChats() {
  return useContext(ChatsContext);
}

export default function ChatsProvider({ children }) {
  const [chatContainerItems, setChatContainerItems] = useState([]);
  const [stateUpdate, setStateUpdate] = useState(true);

  useEffect(() => {
    const fetchChatContainerItems = async () => {
      const db = await dbPromise;
      const allItems = await db.getAll("chat");
      setChatContainerItems(allItems);
    };
    fetchChatContainerItems();
  }, [stateUpdate]);

  const addChatUser = useCallback(async (chatUser) => {
    console.log("chatuser", chatUser);
    const chatUserWithStatus = { ...chatUser, minimizeStatus: "false" };
    setChatContainerItems((prevItems) => {
      const updatedItems = prevItems.some(
        (item) => item.userId !== chatUser.userId
      )
        ? [...prevItems, chatUserWithStatus]
        : [...prevItems];
      return updatedItems;
    });

    const db = await dbPromise;
    const tx = db.transaction("chat", "readwrite");
    const store = tx.objectStore("chat");
    await store.put(chatUserWithStatus);
    await tx.done;
    setStateUpdate((prev) => !prev);
  }, []);

  const removeChatboxUserById = useCallback(async (id) => {
    setChatContainerItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      return updatedItems;
    });

    const db = await dbPromise;
    const tx = db.transaction("chat", "readwrite");
    const store = tx.objectStore("chat");
    await store.delete(id);
    await tx.done;
    setStateUpdate((prev) => !prev);
  }, []);

  const updateMinimizeStatus = useCallback(async (chatId) => {
    setChatContainerItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.Id === chatId
          ? {
              ...item,
              minimizeStatus:
                item.minimizeStatus === "false" ? "true" : "false",
            }
          : item
      );
      return updatedItems;
    });

    const db = await dbPromise;
    const tx = db.transaction("chat", "readwrite");
    const store = tx.objectStore("chat");
    const item = await store.get(chatId);

    if (item) {
      item.minimizeStatus = item.minimizeStatus === "false" ? "true" : "false";
      await store.put(item);
    }

    await tx.done;

    setStateUpdate((prev) => !prev);
  }, []);

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
        updateMinimizeStatus,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
}
