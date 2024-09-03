import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const CheckOutPage = () => {
  const { cartItems } = useCart();

  const navigate = useNavigate();

  const navigateBacktoCart = () => {
    navigate("/services");
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
              Go Back to the Cart
            </button>
            <button
              // onClick={handleCheckOut}
              className="flex bg-white rounded-lg shadow dark:border md:mt-0 max-w-sm w-auto p-4 dark:bg-gray-800 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white  "
            >
              Submit Payment
            </button>
          </div>

          <div>
            {cartItems.length === 0 ? (
              <div className="flex justify-center">Your Cart is empty</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-8">
                {cartItems.map((item) => (
                  <div className="flex" key={item.serviceId}>
                    <div className="w-80 bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
                      <div className="flex justify-between px-4 pt-4">
                        <button
                          id="dropdownButton"
                          data-dropdown-toggle="dropdown"
                          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                          type="button"
                        >
                          <span className="sr-only">Open dropdown</span>
                          <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 3"
                          >
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                          </svg>
                        </button>
                        <div className=" text-xl">
                          <span>Price: </span>${item.servicePrice}
                        </div>
                        <div
                          id="dropdown"
                          className={`z-10 hidden  absolute w-60 ml-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700`}
                        >
                          <ul className="py-2" aria-labelledby="dropdownButton">
                            <li>
                              <a
                                // onClick={() => handleDelete(serviceId)}
                                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                              >
                                Delete
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-col items-center pb-10">
                        <img
                          className="w-48 h-48 mb-3 mt-10 rounded-full shadow-lg"
                          src={item.image ? item.image : "no image"}
                          alt="Bonnie image"
                        />
                        <div className="mb-1 text-xl  min-w-full font-medium text-center text-gray-900 dark:text-white p-4">
                          {item.serviceId}
                          <p className="mb-1 xl:text-xl lg:text-lg md:text-sm  text-center font-medium text-gray-900 dark:text-white">
                            {item.service}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
