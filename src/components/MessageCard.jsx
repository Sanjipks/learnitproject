import React, { useCallback, useEffect, useState } from "react";
import { bufferToBase64 } from "../utility/BufferToBase64";
import { useLogin } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import EditService from "./modals/EditService";
import CartIcon from "../assets/CartIcon";
import { useCart } from "../context/CartContext";

const MessageCard = (props) => {
  const {
    service,
    serviceId,
    serviceLogo,
    deleteService,
    expandedservice,
    setExpandedservice,
  } = props;
  const navigate = useNavigate();

  const { addToCart, removeFromCart } = useCart();

  const [image, setImage] = useState(null);
  const [expand, setExpand] = useState("hidden");
  const [serviceEditPop, setServiceEditPop] = useState(false);

  const { loginInfo } = useLogin();
  const loggedinUserRole = loginInfo.userRole;
  const loginState = loginInfo.loginState;

  useEffect(() => {
    if (serviceLogo && serviceLogo.data) {
      const base64String = bufferToBase64(serviceLogo.data);
      setImage(`data:image/jpeg;base64,${base64String}`);
    }
  }, [serviceLogo]);

  const handleExpand = (id) => {
    if (expand === "hidden" && expandedservice === null) {
      setExpand("block");
      setExpandedservice(id);
    } else {
      setExpand("hidden");
      setExpandedservice(null);
    }
  };

  const handleMouseLeave = () => {
    setExpand("hidden");
    setExpandedservice(null);
  };

  const handleDelete = (id) => {
    deleteService(id);
    setExpand("hidden");
  };
  const handleEdit = () => {
    setServiceEditPop((prev) => !prev);
  };

  const handleAddToCart = (id) => {
    addToCart(id);
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
  };

  return (
    <div class="flex items-start gap-2.5">
      <img
        class="w-8 h-8 rounded-full"
        src="/docs/images/people/profile-picture-3.jpg"
        alt="Jese image"
      />
      <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
        <div class="flex items-center space-x-2 rtl:space-x-reverse">
          <span class="text-sm font-semibold text-gray-900 dark:text-white">
            Bonnie Green
          </span>
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
            11:46
          </span>
        </div>
        <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
          That's awesome. I think our users will really appreciate the
          improvements.
        </p>
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
          Delivered
        </span>
      </div>
      <button
        id="dropdownMenuIconButton"
        data-dropdown-toggle="dropdownDots"
        data-dropdown-placement="bottom-start"
        class="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
        type="button"
      >
        <svg
          class="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 4 15"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>
      <div
        id="dropdownDots"
        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600"
      >
        <ul
          class="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownMenuIconButton"
        >
          <li>
            <a
              href="#"
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Reply
            </a>
          </li>
          <li>
            <a
              href="#"
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Forward
            </a>
          </li>
          <li>
            <a
              href="#"
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Copy
            </a>
          </li>
          <li>
            <a
              href="#"
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Report
            </a>
          </li>
          <li>
            <a
              href="#"
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Delete
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MessageCard;
