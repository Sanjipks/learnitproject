import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "../../assets/icons/DeleteIcon";

const MyCart = () => {
  const { cartItems, removeFromCartbyIndexedId } = useCart();

  const navigate = useNavigate();

  const handledelete = (id) => {
    removeFromCartbyIndexedId(id);
  };

  const navigateBacktoServiceList = () => {
    navigate("/services");
  };

  const handleCheckOut = () => {
    navigate("/checkout");
  };
  return (
    <div className="min-h-screen h-auto flex flex-col justify-items-center justify-between bg-gray-500 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
      <div className="md:my-28">
        <div className=" max-w-screen-xl flex w-full mx-auto">
          <div className="w-full flex mx-auto justify-center bg-gray-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-4 ">
              My Cart
            </h1>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto mt-10">
          <div className="max-w-screen-xl flex justify-between px-2  mx-auto mt-12">
            <button
              onClick={navigateBacktoServiceList}
              className="flex bg-gray-100 rounded-lg shadow dark:border md:mt-0 max-w-sm w-auto p-4 dark:bg-gray-800 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white  "
            >
              Service List
            </button>
            {cartItems.length !== 0 && (
              <div className="text-xl">
                You have {cartItems.length} Items in Your Cart
              </div>
            )}

            <button
              disabled={cartItems.length < 1}
              onClick={handleCheckOut}
              className="flex bg-gray-100 disabled:cursor-not-allowed disabled:invisible rounded-lg shadow dark:border md:mt-0 max-w-sm w-auto p-4 dark:bg-gray-800 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white  "
            >
              Check Out
            </button>
          </div>

          <div className="mt-5 flex justify-center">
            {cartItems.length === 0 ? (
              <div className="flex text-xl">Your Cart is empty</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-8">
                {cartItems.map((item) => (
                  <div className="flex" key={item.serviceId}>
                    <div className="w-80 bg-gray-100 border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
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

                        <div onClick={() => handledelete(item.id)}>
                          <DeleteIcon />
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

export default MyCart;
