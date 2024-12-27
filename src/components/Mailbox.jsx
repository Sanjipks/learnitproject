import React from "react";

const Mailbox = () => {
  return (
    <div className="flex h-dvh w-full flex-col max-w-screen-xl border border-gray-50 rounded-lg mt-20">
      <div className="flex w-full h-20 border rounded-lg border-gray-50 justify-center">
        <h1 className="text-lg p-2">My Mails</h1>
      </div>
      <div className="w-96 h-full border border-l-0 border-t-0 rounded-lg border-gray-50">
        <h1 className="text-lg text-center border rounded-lg p-4">Inbox</h1>
      </div>
    </div>
  );
};

export default Mailbox;
