import React, { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export default function CartProvider({ children }) {
  // Initialize cartItems from localStorage or with an empty array
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  // Function to add items to the cart
  const addToCart = useCallback((item) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems, item];
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  }, []);

  // Function to remove a single item from the cart
  const removeFromCart = useCallback((id) => {
    setCartItems((prevItems) => {
      const index = prevItems.findIndex((item) => item === id);
      if (index !== -1) {
        const updatedItems = [
          ...prevItems.slice(0, index),
          ...prevItems.slice(index + 1),
        ];
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        return updatedItems;
      }
      return prevItems;
    });
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
