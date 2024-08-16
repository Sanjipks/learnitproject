import React from "react";

const Cart = (props) => {
  const { cartItems } = props;
  return (
    <div>
      <h3>
        Cart Items: <span>{cartItems.length}</span>
      </h3>
      {/* <ul>
        {cartItems.map((item, index) => (
          <li key={index}>Item ID: {item}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default Cart;
