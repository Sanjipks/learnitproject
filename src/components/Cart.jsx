import React from "react";

const Cart = (props) => {
  const { cartItems } = props;
  return (
    <div>
      Cart Items: <span>{" " + cartItems.length}</span>
    </div>
  );
};

export default Cart;
