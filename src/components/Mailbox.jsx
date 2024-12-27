import React from "react";

const Mailbox = () => {
  return (
    <div className="flex h-dvh w-full flex-col max-w-screen-xl border border-gray-50 rounded-lg mt-20">
      <div className="flex w-full h-20 border rounded-lg border-gray-50 justify-center">
        <h1 className="text-lg p-2">My Mails</h1>
      </div>
      <div className="flex flew-row h-full">
        <section className="w-2/5 h-full border border-l-0 border-t-0 rounded-lg border-gray-50">
          <h1 className="text-lg text-center border rounded-lg p-4">MailBox</h1>
          <div className="flex flex-col text-lg  mx-4">
            <button
              className="border p-2 my-2 min-w-96 rounded-md"
              type="button "
            >
              Inbox
            </button>
            <button
              className="border p-2 my-2 min-w-96 rounded-md"
              type="button "
            >
              Sent
            </button>
            <button
              className="border p-2 my-2 min-w-96 rounded-md"
              type="button "
            >
              Junk
            </button>
            <button
              className="border p-2 my-2 min-w-96 rounded-md"
              type="button "
            >
              Deleted
            </button>
          </div>
        </section>
        <section className="w-3/5 h-full border rounded-lg border-gray-50">
          <h1 className="text-lg text-center border rounded-lg p-4">
            Selected
          </h1>
        </section>
      </div>
    </div>
  );
};

export default Mailbox;
