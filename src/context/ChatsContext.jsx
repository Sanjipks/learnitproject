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

export default function ChatContainerProvider({ children }) {
  const [chatContainerItems, setChatContainerItems] = useState([]);

  useEffect(() => {
    const fetchChatContainerItems = async () => {
      const db = await dbPromise;
      const allItems = await db.getAll("chat");
      setChatContainerItems(allItems);
    };
    fetchChatContainerItems();
  }, []);

  const addChatbox = useCallback(async (chatbox) => {
    setChatContainerItems((prevItems) => {
      const updatedItems = [...prevItems, chatbox];
      return updatedItems;
    });

    const db = await dbPromise;
    const tx = db.transaction("chat", "readwrite");
    const store = tx.objectStore("chat");
    await store.put(chatbox);
    await tx.done;
  }, []);

  const removeChatboxById = useCallback(async (id) => {
    setChatContainerItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      return updatedItems;
    });

    const db = await dbPromise;
    const tx = db.transaction("chat", "readwrite");
    const store = tx.objectStore("chat");
    await store.delete(id);
    await tx.done;
  }, []);

  const removeChatboxByServiceId = useCallback(async (serviceId) => {
    setChatContainerItems((prevItems) => {
      const updatedItems = prevItems.filter(
        (item) => item.serviceId !== serviceId
      );
      return updatedItems;
    });

    const db = await dbPromise;
    const tx = db.transaction("chat", "readwrite");
    const store = tx.objectStore("chat");

    const index = store.index("by-serviceId");
    const matchingRecord = await index.get(serviceId);

    if (matchingRecord) {
      await store.delete(matchingRecord.id);
    }

    await tx.done;
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
        addChatbox,
        removeChatboxById,
        removeChatboxByServiceId,
        clearChatContainer,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
}
