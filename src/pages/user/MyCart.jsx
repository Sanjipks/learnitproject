import React from "react";
import { useCart } from "../../context/CartContext";

const MyCart = () => {
  const { cartItems } = useCart();
  return (
    <div className="min-h-screen h-auto flex flex-col justify-items-center justify-between bg-gray-500 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
      <div className="md:my-20">
        <div className="w-full flex mx-auto justify-center bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
          <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-4 ">
            My Cart
          </h1>
        </div>
        <div className=" max-w-screen-xl  justify-between mx-auto mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center">
            {cartItems.map((item) => (
              <div className="p-2 border mx-4">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
