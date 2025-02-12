import React, { useState } from "react";

const ContactMessageReply = (props) => {
  const { senderEmail, senderName } = props;

  const [formData, setformData] = useState({
    name: senderName || "",
    email: senderEmail || "",
    message: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setformData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    ("todo");
  };

  return (
    <div className="h-auto w-96 flex flex-col rounded-lg xm:gap-4 bg-gray-500 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
      <div className="bg-gray-100 rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Reply Message
          </h3>
        </div>

        <form className="p-4 md:p-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name || senderName}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={senderName || "Enter your name"}
                required
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email || senderEmail}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={senderEmail || "Enter your email"}
                required
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="6"
                value={formData.message}
                onChange={handleInputChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your message here"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="text-dark bg-primary-600 border border-gray-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-2 px-4 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 text-gray-950 dark:text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactMessageReply;
