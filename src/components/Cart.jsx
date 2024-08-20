import React from "react";
import CartIcon from "../assets/CartIcon";

const Cart = (props) => {
  const { cartItems } = props;
  return (
    <div className="flex w-auto px-1">
      <span className="mx-1">Items in</span> <CartIcon />:{" "}
      <span className="mx-1 w-6"> {cartItems.length}</span>
    </div>
  );
};

export default Cart;
