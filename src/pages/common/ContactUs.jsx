import React from "react";

const ContactUs = () => {
  return (
    <div className="h-dvh flex  md:flex-col sm:flex-col sm:items-center dark:bg-gray-600 dark:border-gray-800 bg-gray-200 border-gray-200 pt-12">
      <div className=" bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
        <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-4 ">
          Contact Us
        </h1>
      </div>
      <div className="max-w-screen-xl w-full max-h-dvh h-1/2 mt-48 flex md:flex-row sm:flex-col-reverse">
        <section className=" w-full h-full bg-amber-300">Contact</section>
        <section className=" w-full h-full bg-amber-100">Map</section>
      </div>
    </div>
  );
};

export default ContactUs;
