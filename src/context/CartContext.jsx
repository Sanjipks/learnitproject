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
  }, []);

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

  // Function to remove an item from the cart and IndexedDB
  const removeFromCart = useCallback(async (id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.serviceId !== id);
      return updatedItems;
    });

    const db = await dbPromise;
    const tx = db.transaction("cart", "readwrite");
    const store = tx.objectStore("cart");
    await store.delete(id); // Remove the item from IndexedDB
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
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
