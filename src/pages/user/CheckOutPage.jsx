import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useLogin } from "../../context/LoginContext";
import Login from "../common/Login";
import CartIcon from "../../assets/icons/CartIcon";

const CheckOutPage = () => {
  const { cartItems } = useCart();
  const { loginInfo } = useLogin();
  const navigate = useNavigate();

  const [itemTotal, setItemTotal] = useState(0);

  const taxRate = 6 / 100;
  const userRole = loginInfo.userRole;

  useEffect(() => {
    if (userRole !== "user") {
      localStorage.clear();
    }
  });

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const sum = cartItems.reduce((acc, item) => {
        const price = parseFloat(item.servicePrice) || 0;
        return acc + price;
      }, 0.0);
      setItemTotal(sum);
    }
  }, [cartItems]);

  const tax = itemTotal * taxRate;
  const total = itemTotal + tax;

  const navigateBacktoCart = () => {
    navigate("/mycart");
  };
  return (
    <>
      {userRole === "user" ? (
        <div className="min-h-screen h-auto flex flex-col justify-items-center justify-between bg-gray-500 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
          <div className="md:my-20">
            <div className="w-full flex mx-auto justify-center bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-4 ">
                Check Out
              </h1>
            </div>
            <div className=" max-w-screen-xl  justify-start mx-auto mt-20">
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
              </div>
              <div className="flex mt-20 flex-col mx-auto">
                <h4 className="text-xl text-center mb-6">Your Cart Summary</h4>

                <div className="flex justify-center flex-col">
                  <table>
                    <thead className="border">
                      <tr>
                        <th className="border">Service ID</th>
                        <th className="border">Service Name</th>
                        <th className="border">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => {
                        return (
                          <tr
                            className="border justify-center"
                            key={item.serviceId}
                          >
                            <td className="dark:border text-center">
                              {item.serviceId}
                            </td>
                            <td className="dark:border text-center">
                              {item.service}
                            </td>
                            <td className="dark:border text-center">
                              {item.servicePrice}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td></td>
                        <td className=" text-right">Tax:</td>
                        <td className="text-center">{tax.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className=" text-right">Total:</td>
                        <td className=" text-center">{total.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>

                  <div className=" flex justify-end mt-20">
                    <button
                      // onClick={handlePayment}
                      className="flex bg-white rounded-lg shadow dark:border md:mt-0 max-w-sm w-auto p-4 dark:bg-gray-800 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white  "
                    >
                      Submit Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default CheckOutPage;
