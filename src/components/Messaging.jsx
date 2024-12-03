import React from "react";

const Messaging = () => {
  return (
    <div className="h-5/6 fixed bottom-1 z-10 w-96 justify-center border border-gray-900 dark:border-gray-100 ml-1 rounded-md bg-slate-100 dark:bg-slate-700">
      <h1 className=" flex justify-between border border-gray-900 z-10 dark:border-gray-100 h-10 w-96 mx-auto text-center py-2 rounded-md dark:text-slate-200 text-slate-900">
        <button className="w-12 ml-2">Minimize</button>
        <span>Messaging</span>
        <button className="w-12 mr-2">Close</button>
      </h1>
    </div>
  );
};

export default Messaging;
