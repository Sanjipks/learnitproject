import React, { useState } from "react";
import GMap from "../../components/Map";
import { sendContactUsMessages } from "../../apis/Api";
import { toast } from "react-toastify";
import { useLogin } from "../../context/LoginContext";

const ContactUs = () => {
  const { loginInfo } = useLogin();
  const [sendername, setSendername] = useState(loginInfo?.userName || "");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(loginInfo?.userEmail || "");

  const handleInput = (event) => {
    const { name, value } = event.target;

    if (name === "message") {
      setMessage(value);
    }

    if (name === "sendername" && !loginInfo?.userName) {
      setSendername(value);
    }

    if (name === "email" && !loginInfo?.userEmail) {
      setEmail(value);
    }
  };

  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await sendContactUsMessages(email, sendername, message);
      if (response.status == 201) {
        toast("message sent successfully", { autoClose: 1000 });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen h-auto flex flex-col xm:gap-4 bg-gray-500 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
      <div className="mt-20">
        <div className="flex mx-auto w-full justify-center  bg-gray-100 rounded-lg shadow dark:border md:mt-0 xm:max-w-sm md:max-w-md xl:p-0 dark:bg-gray-800">
          <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-4 ">
            Contact Us
          </h1>
        </div>
      </div>
      <div className="items-center justify-start xl:mt-20 px-2">
        <div className="max-w-screen-xl w-full sm:h-auto sm:m-auto flex md:flex-row xm:flex-col-reverse">
          <section className="flex justify-center items-center w-full bg-blue-200 sm:rounded-br-xl md:rounded-br-none sm:rounded-bl-xl md:rounded-tl-xl">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-gray-100 rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Send Us Message
                  </h3>
                </div>

                <form className="p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label
                        htmlFor="sendername"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="sendername"
                        id="sendername"
                        onChange={handleInput}
                        value={
                          loginInfo?.userName ? loginInfo?.userName : sendername
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder={
                          loginInfo?.userName
                            ? loginInfo?.userName
                            : "type your name here"
                        }
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
                        onChange={handleInput}
                        value={
                          loginInfo?.userEmail ? loginInfo?.userEmail : email
                        }
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder={
                          loginInfo?.userEmail
                            ? loginInfo?.userEmail
                            : "type your email here"
                        }
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
                        type="text"
                        name="message"
                        id="message"
                        rows="4"
                        onChange={handleInput}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your message here"
                      ></textarea>
                    </div>
                  </div>
                  <button
                    onClick={handleMessageSubmit}
                    className="text-dark bg-primary-600 border border-gray-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-2 px-4 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800  text-gray-950 dark:text-white"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </section>
          <section className="flex justify-center items-center min-h-max w-full bg-amber-100 md:rounded-br-xl sm:rounded-tr-xl sm:rounded-tl-xl md:rounded-tl-none">
            <div className="flex w-full min-h-96 p-4 justify-center items-center ">
              <GMap />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
