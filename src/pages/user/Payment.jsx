import React, { useState } from "react";
import ConfirmDecision from "../../components/modals/utilitycomponent/ConfirmDecision";

const PaymentForm = () => {
  const [inputs, setInputs] = useState({
    carholderName: "",
    cardNumber: "",
    expiryDate: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [pop, setPop] = useState(false);
  const [type, setType] = useState(null);

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmitPayment = () => {
    setPop(true);
  };

  const handlePop = (state) => {
    setPop(false);

    if (state) {
      try {
        {
          alert("payment sucessfully made");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setType(null);
      }
    } else {
      alert("payment can not be made");
    }
  };

  return (
    <>
      <div className="min-h-screen h-auto flex flex-col xm:gap-4 bg-gray-500 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
        <div className="items-center justify-start md:my-40 sm:my-20 px-2">
          <div className="max-w-screen-xl w-full sm:h-auto sm:m-auto flex md:flex-row xm:flex-col-reverse">
            <section className="flex md:h-[756px]  bg-gray-400 dark:bg-gray-900 sm:rounded-br-xl md:rounded-br-none sm:rounded-bl-xl md:rounded-tl-xl  justify-center items-center w-full">
              Payment Type: {type}
            </section>
            <section className="flex md:h-[756px] justify-center items-center min-h-max w-full bg-gray-400 dark:bg-gray-900 md:rounded-br-xl sm:rounded-tr-xl sm:rounded-tl-xl md:rounded-tl-none sm:mt-8 md:mt-0 sm:px-2 md:px-0">
              <div className=" flex w-full flex-col items-center justify-center sm:py-2 md:py-0 m-auto ">
                <div className="w-full mx-4 bg-gray-200 rounded-xl shadow dark:border md:mt-0 sm:max-w-sm md:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="py-6 space-y-4 md:space-y-6 md:p-10 sm:m-4">
                    <div className="max-w-lg mx-auto p-6 bg-gray-100 dark:bg-gray-700 shadow-md rounded-lg">
                      <h2 className="text-2xl font-semibold text-center mb-4">
                        Choose Payment Method
                      </h2>

                      <div className="flex justify-center mb-6">
                        <button
                          type="button"
                          className={`px-4 py-2 mr-2 text-sm font-medium border rounded-lg focus:outline-none ${
                            paymentMethod === "credit"
                              ? "bg-blue-500 text-white"
                              : "border-gray-300"
                          }`}
                          onClick={() => {
                            setPaymentMethod("credit");
                            setType("credit");
                          }}
                        >
                          Credit Card
                        </button>
                        <button
                          type="button"
                          className={`px-4 py-2 text-sm font-medium border rounded-lg focus:outline-none ${
                            paymentMethod === "bank"
                              ? "bg-blue-500 text-white"
                              : "border-gray-300"
                          }`}
                          onClick={() => {
                            setPaymentMethod("bank");
                            setType("bank");
                          }}
                        >
                          Bank Account
                        </button>
                      </div>

                      {paymentMethod === "credit" && (
                        <form>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                              Cardholder Name
                            </label>
                            <input
                              type="text"
                              name="carholderName"
                              onChange={handleInput}
                              className="mt-1 block w-full p-2 border border-gray-300 dark:text-gray-900 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                              placeholder="type your name"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                              Card Number
                            </label>
                            <input
                              type="text"
                              name="cardNumber"
                              onChange={handleInput}
                              className="mt-1 block w-full p-2 border border-gray-300 dark:text-gray-900 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>
                          <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                name="date"
                                onChange={handleInput}
                                className="mt-1 block w-full p-2 border border-gray-300 dark:text-gray-900 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="MM/YY"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                                CVV
                              </label>
                              <input
                                type="text"
                                name="expiryDate"
                                onChange={handleInput}
                                className="mt-1 block w-full p-2 border border-gray-300 dark:text-gray-900 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="123"
                              />
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleSubmitPayment("creditCard")}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
                          >
                            Pay with Credit Card
                          </button>
                        </form>
                      )}

                      {paymentMethod === "bank" && (
                        <form>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                              Account Holder Name
                            </label>
                            <input
                              type="text"
                              className="mt-1 block w-full p-2 border border-gray-300 dark:text-gray-900 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                              placeholder="type your name"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                              Account Number
                            </label>
                            <input
                              type="text"
                              className="mt-1 block w-full p-2 border border-gray-300 dark:text-gray-900 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                              placeholder="0123456789"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                              Bank Name
                            </label>
                            <input
                              type="text"
                              className="mt-1 block w-full p-2 border border-gray-300 dark:text-gray-900 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                              placeholder="bank type"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleSubmitPayment("bankAccount")}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
                          >
                            Pay with Bank Account
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      {pop ? (
        <ConfirmDecision
          handlePopAction={handlePop}
          typo="Are you sure you want to make a payment?"
        />
      ) : null}
    </>
  );
};

export default PaymentForm;
