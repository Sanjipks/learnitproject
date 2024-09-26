import React, { useState } from "react";

// <div
//   id="popup-modal"
//   tabIndex="-1"
//   className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
// >
//   <>
//     <div className="z-50 absolute p-4 w-full max-w-md min-w-96 max-h-full">
//       <div className="relative bg-gray-100 rounded-lg shadow dark:bg-gray-700">
//         <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//             Select Payment Method
//           </h3>
//           <button
//             onClick={handleClose}
//             type="button"
//             className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//             data-modal-hide="popup-modal"
//           >
//             <svg
//               className="w-3 h-3"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 14 14"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//               />
//             </svg>
//             <span className="sr-only">Close modal</span>
//           </button>
//         </div>

//         <form className="p-4 md:p-5">
//           <div className="grid gap-4 mb-4 grid-cols-2">
//             <div className="col-span-2">
//               <label
//                 htmlFor="servicename"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Service Name
//               </label>
//               <input
//                 type="text"
//                 name="servicename"
//                 id="servicename"
//                 //  onClick={handleInput}
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                 // placeholder={servicename}
//                 required
//               />
//             </div>
//             <div className="col-span-2">
//               <label
//                 htmlFor="servicecode"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Service Code
//               </label>
//               <input
//                 type="text"
//                 name="servicecode"
//                 id="servicecode"
//                 // onClick={handleInput}
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                 //  placeholder={serviceId}
//                 required
//               />
//             </div>
//             <div className="col-span-2">
//               <label
//                 htmlFor="serviceprice"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Service Price
//               </label>
//               <input
//                 type="text"
//                 name="serviceprice"
//                 id="serviceprice"
//                 //  onChange={handleInput}
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                 //  placeholder={servicePrice}
//                 required
//               />
//             </div>
//             <div className="col-span-2">
//               <label
//                 htmlFor="serviceimage"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Image
//               </label>
//               <input
//                 type="file"
//                 name="serviceimage"
//                 id="serviceimage"
//                 // onChange={handleImageChange}
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                 placeholder="add image"
//                 required
//               />
//             </div>
//           </div>
//           <button
//             // onClick={handleSubmit}
//             className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   </>
// </div>

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit");

  return (
    <div className="min-h-screen h-auto flex flex-col xm:gap-4 bg-gray-500 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
      <div className="items-center justify-start md:my-40 sm:my-20 px-2">
        <div className="max-w-screen-xl w-full sm:h-auto sm:m-auto flex md:flex-row xm:flex-col-reverse">
          <section className="flex md:h-[756px]  bg-gray-400 dark:bg-gray-900 sm:rounded-br-xl md:rounded-br-none sm:rounded-bl-xl md:rounded-tl-xl  justify-center items-center w-full">
            {/* <Carasoul
              images={images}
              buttonShow={false}
              csss="w-auto md:h-[756px] sm:rounded-br-xl md:rounded-br-none sm:rounded-bl-xl md:rounded-tl-xl"
            /> */}
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
                        className={`px-4 py-2 mr-2 text-sm font-medium border rounded-lg focus:outline-none ${
                          paymentMethod === "credit"
                            ? "bg-blue-500 text-white"
                            : "border-gray-300"
                        }`}
                        onClick={() => setPaymentMethod("credit")}
                      >
                        Credit Card
                      </button>
                      <button
                        className={`px-4 py-2 text-sm font-medium border rounded-lg focus:outline-none ${
                          paymentMethod === "bank"
                            ? "bg-blue-500 text-white"
                            : "border-gray-300"
                        }`}
                        onClick={() => setPaymentMethod("bank")}
                      >
                        Bank Account
                      </button>
                    </div>

                    {paymentMethod === "credit" && (
                      <form>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Card Number
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="mb-4 grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              CVV
                            </label>
                            <input
                              type="text"
                              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                              placeholder="123"
                            />
                          </div>
                        </div>
                        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600">
                          Pay with Credit Card
                        </button>
                      </form>
                    )}

                    {paymentMethod === "bank" && (
                      <form>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Account Holder Name
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Account Number
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0123456789"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Bank Name
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Bank of America"
                          />
                        </div>
                        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600">
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
  );
};

export default PaymentForm;
