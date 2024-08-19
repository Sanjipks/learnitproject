import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export default function LoginProvider({ children }) {
  const [cartItems, setCartItems] = useState({
    cartItems: localStorage.getItem([]),
  });

  const cartUpdate = (updates) => {
    setCartItems((prevInfo) => {
      const updatedInfo = [...prevInfo, ...updates];

      localStorage.setItem("cartItems", updatedInfo.cartItems);

      return updatedInfo;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, cartUpdate }}>
      {children}
    </CartContext.Provider>
  );
}
