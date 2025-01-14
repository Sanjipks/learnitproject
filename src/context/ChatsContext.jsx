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
    setChatContainerItems((prevItems) => {
      const updatedItems = [...prevItems, chatUser];
      return updatedItems;
    });

    const db = await dbPromise;
    const tx = db.transaction("chat", "readwrite");
    const store = tx.objectStore("chat");
    await store.put(chatUser);
    await tx.done;
  }, []);

  const removeChatboxUserById = useCallback(
    async (id) => {
      setChatContainerItems((prevItems) => {
        const updatedItems = prevItems.filter((item) => item.id !== id);
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
        addChatUser,
        removeChatboxUserById,
        removeChatboxByServiceId,
        clearChatContainer,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
}
