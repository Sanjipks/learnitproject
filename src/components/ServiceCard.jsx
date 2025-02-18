import React, { useEffect, useState } from "react";
import { bufferToBase64 } from "../utility functions/BufferToBase64";
import { useLogin } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import EditService from "./modals/EditService";
import { useCart } from "../context/CartContext";
import CartIcon from "../assets/icons/CartIcon";
const LazySpinner = React.lazy(() => import("./common/Spinner"));

const ServiceCard = (props) => {
  const {
    service,
    serviceId,
    serviceLogo,
    servicePrice,
    deleteService,
    expandedservice,
    setExpandedservice,
  } = props;
  const navigate = useNavigate();

  const { cartItems, addToCart, removeFromCart } = useCart();

  const [image, setImage] = useState(null);
  const [expand, setExpand] = useState("hidden");
  const [serviceEditPop, setServiceEditPop] = useState(false);
  const [loading, setLoading] = useState(true);

  let serviceObject = { service, serviceId, image, servicePrice };

  const { loginInfo } = useLogin();
  const loggedinUserRole = loginInfo.userRole;
  const loginState = loginInfo.loginState;

  useEffect(() => {
    if (serviceLogo && serviceLogo.data) {
      const base64String = bufferToBase64(serviceLogo.data);
      setImage(`data:image/jpeg;base64,${base64String}`);
    }
    setLoading(false);
  }, [serviceLogo]);

  const handleExpand = (id) => {
    if (expand === "hidden" && expandedservice === null) {
      setExpand("block");
      setExpandedservice(id);
    } else {
      setExpand("hidden");
      setExpandedservice(null);
      setServiceEditPop(false);
    }
  };

  const handleMouseLeave = () => {
    if (serviceEditPop === false) {
      setExpand("hidden");
      setExpandedservice(null);
    }
  };

  const handleDelete = (id) => {
    deleteService(id);
    setExpand("hidden");
  };
  const handleEdit = () => {
    setServiceEditPop((prev) => !prev);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    setExpand("hidden");
    setExpandedservice(null);
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
    setExpand("hidden");
    setExpandedservice(null);
  };

  const handleRedirectPage = () => {
    navigate("/register");
  };
  const handleclose = () => {
    setServiceEditPop(false);
    setExpand("hidden");
    setExpandedservice(null);
  };

  return (
    <>
      <div className="flex" onMouseLeave={handleMouseLeave}>
        <div className="w-80 bg-gray-200 border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-between px-4 pt-4">
            <button
              onClick={() => handleExpand(serviceId)}
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
              <span>Price: </span>${servicePrice}
            </div>

            {expandedservice === serviceId ? (
              <div
                id="dropdown"
                className={`z-10 ${expand} absolute w-48 mt-9 text-base list-none bg-gray-100 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700`}
              >
                {loggedinUserRole === "admin" && loginState === "true" ? (
                  <ul className="py-2" aria-labelledby="dropdownButton">
                    <li>
                      <a
                        onClick={handleEdit}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Edit
                      </a>
                    </li>

                    <li>
                      <a
                        onClick={() => handleDelete(serviceId)}
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Delete
                      </a>
                    </li>
                  </ul>
                ) : loggedinUserRole === "user" && loginState === "true" ? (
                  <ul className="py-2" aria-labelledby="dropdownButton">
                    {!cartItems.some(
                      (item) => item.serviceId === expandedservice
                    ) ? (
                      <li
                        onClick={() => handleAddToCart(serviceObject)}
                        type="button"
                        aria-labelledby="addtocartButton"
                        className="flex flex-row w-auto pl-6 py-2 text-xl  text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        <span className="mr-4">add to my </span>
                        <CartIcon />
                      </li>
                    ) : (
                      <li
                        onClick={() => handleRemoveFromCart(serviceId)}
                        aria-labelledby="removefromcartButton"
                        className="flex flex-row w-auto pl-6 py-2 text-xl text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        <span className="mr-4">remove from </span>
                        <CartIcon />
                      </li>
                    )}
                  </ul>
                ) : (
                  <ul className="py-2" aria-labelledby="dropdownButton">
                    <li
                      onClick={handleRedirectPage}
                      className="flex flex-row ml-6 text-xl text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      <span className="mr-4">add to </span>
                      <CartIcon />
                    </li>
                  </ul>
                )}
              </div>
            ) : null}
          </div>
          {serviceEditPop && expandedservice === serviceId ? (
            <EditService
              servicename={service}
              serviceId={serviceId}
              servicePrice={servicePrice}
              handleclose={handleclose}
            />
          ) : null}
          <div className="flex flex-col items-center pb-10">
            {loading ? (
              <LazySpinner />
            ) : (
              <img
                className="w-48 h-48 mb-3 mt-10 rounded-full shadow-lg"
                src={image ? image : "no image"}
                alt="Bonnie image"
              />
            )}

            <div className="mb-1 text-xl  min-w-full font-medium text-center text-gray-900 dark:text-white p-4">
              {service}
              <p className="mb-1 xl:text-xl lg:text-lg md:text-sm  text-center font-medium text-gray-900 dark:text-white">
                {serviceId}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
