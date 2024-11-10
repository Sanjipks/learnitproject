import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { openDB } from "idb";

// initialize IndexedDB
const dbPromise = openDB("ShoppingCartDB", 1, {
  upgrade(db) {
    const store = db.createObjectStore("cart", {
      keyPath: "id",
      autoIncrement: true,
    });
    store.createIndex("by-id", "id");
    store.createIndex("by-serviceId", "serviceId", { unique: true });
  },
});

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // function to load cart items from IndexedDB when the component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      const db = await dbPromise;
      const allItems = await db.getAll("cart");
      setCartItems(allItems);
    };
    fetchCartItems();
  }, [cartItems]);

  // function to add an item to the cart and IndexedDB
  const addToCart = useCallback(async (item) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems, item];
      return updatedItems;
    });

    const db = await dbPromise;
    const tx = db.transaction("cart", "readwrite");
    const store = tx.objectStore("cart");
    await store.put(item); // Add or update the item in the IndexedDB
    await tx.done;
  }, []);

  // Function to remove an item from the cart and IndexedDB with generated indexedDb id
  const removeFromCartbyIndexedId = useCallback(async (id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      return updatedItems;
    });

    const db = await dbPromise;
    const tx = db.transaction("cart", "readwrite");
    const store = tx.objectStore("cart");
    await store.delete(id); // Remove the item from IndexedDB
    await tx.done;
  }, []);

  // Function to remove an item from the cart and IndexedDB with passed servicedId from parent
  const removeFromCart = useCallback(async (serviceid) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => {
        item.serviceId !== serviceid;
      });
      return updatedItems;
    });

    // Get a reference to IndexedDB
    const db = await dbPromise;

    const tx = db.transaction("cart", "readwrite");

    const store = tx.objectStore("cart");

    // Create an index to search for the item by serviceId (assuming serviceId is indexed)
    const index = store.index("by-serviceId");

    // Get the record with the matching serviceId
    const matchingRecord = await index.get(serviceid);

    if (matchingRecord) {
      // Remove the item by its IndexedDB ID (primary key)
      await store.delete(matchingRecord.id);
    }

    await tx.done;
  }, []);

  // Function to clear all items from the cart and IndexedDB
  const clearCart = useCallback(async () => {
    setCartItems([]);
    const db = await dbPromise;
    const tx = db.transaction("cart", "readwrite");
    const store = tx.objectStore("cart");
    await store.clear(); // Clear all items from IndexedDB
    await tx.done;
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        removeFromCartbyIndexedId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
