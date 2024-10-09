import React, { useState } from "react";
import { useLogin } from "../../context/LoginContext";
import { addServices } from "../../apis/Api";
import { toast } from "react-toastify";
import { convertToBase64 } from "../../utility/ConvertToBase64";

const AddNewService = (props) => {
  const { handleformview, handleclose } = props;
  const [inputs, setInputs] = useState({
    servicename: "",
    serviceprice: 0.0,
    servicecode: null,
    serviceimage: null,
  });

  const { loginInfo } = useLogin();
  const loggedinUserRole = loginInfo.userRole;

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setInputs({
        ...inputs,
        serviceimage: event.target.files[0],
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let base64Image = null;

    if (inputs.serviceimage) {
      base64Image = await convertToBase64(inputs.serviceimage);
    }
    const bodyData = { ...inputs, serviceimage: base64Image, loggedinUserRole };

    const res = await addServices(bodyData);
    const data = await res.json();
    handleformview(false);
    if (res.status == 201) {
      toast(data.message);
    }
  };

  return (
    <>
      <div className="z-50 absolute p-4 w-full max-w-md max-h-full mt-16">
        <div className="relative bg-gray-100 rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add Service
            </h3>
            <button
              onClick={handleclose}
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <form className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="servicename"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Add Service Name
                </label>
                <input
                  type="text"
                  name="servicename"
                  id="servicename"
                  onChange={handleInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="type service name"
                  required=""
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="servicecode"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Service Code
                </label>
                <input
                  type="text"
                  name="servicecode"
                  id="servicecode"
                  onChange={handleInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="type service code"
                  required
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="serviceprice"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Service Price
                </label>
                <input
                  type="text"
                  name="serviceprice"
                  id="serviceprice"
                  onChange={handleInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="type price for service"
                  required
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="serviceimage"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image
                </label>
                <input
                  type="file"
                  name="serviceimage"
                  id="serviceimage"
                  onChange={handleImageChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="add image"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewService;
