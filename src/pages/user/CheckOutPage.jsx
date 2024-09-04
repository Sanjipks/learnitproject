import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import CartIcon from "../../assets/CartIcon";
import { useState } from "react";
import { useEffect } from "react";

const CheckOutPage = () => {
  const { cartItems } = useCart();
  const [itemTotal, setItemTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const tax = 6 / 100;

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const sum = cartItems.reduce((acc, item) => {
        const price = parseFloat(item.servicePrice) || 0;
        return acc + price;
      }, 0.0);
      setItemTotal(sum);
      setTotal(itemTotal * (itemTotal * tax));
    }
  }, [cartItems]);

  const navigate = useNavigate();

  const navigateBacktoCart = () => {
    navigate("/mycart");
  };
  return (
    <div className="min-h-screen h-auto flex flex-col justify-items-center justify-between bg-gray-500 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
      <div className="md:my-20">
        <div className="w-full flex mx-auto justify-center bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
          <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-4 ">
            Check Out
          </h1>
        </div>
        <div className=" max-w-screen-xl  justify-between mx-auto mt-20">
          <div className=" flex justify-between">
            <button
              onClick={navigateBacktoCart}
              className="flex bg-white rounded-lg shadow dark:border md:mt-0 max-w-sm w-auto p-4 dark:bg-gray-800 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white  "
            >
              Go Back to the{" "}
              <span>
                <CartIcon />
              </span>
            </button>
            <button
              // onClick={handlePayment}
              className="flex bg-white rounded-lg shadow dark:border md:mt-0 max-w-sm w-auto p-4 dark:bg-gray-800 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white  "
            >
              Submit Payment
            </button>
          </div>
          <div className="flex mt-20 flex-col mx-auto">
            <h2>Your Cart Summary</h2>
            <div className="flex ">Total Items: {cartItems.length}</div>
            <div className="flex justify-center flex-col">
              Items: Price
              {cartItems.map((item) => {
                console.log(item.servicePrice);
                return (
                  <div key={item.serviceId}>
                    {item.serviceId}: {item.servicePrice}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
