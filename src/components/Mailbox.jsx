import React, { useState } from "react";

const Mailbox = () => {
  const [selected, setSelected] = useState("");
  const [messages, setMessages] = useState([]);

  const selectInbox = () => {
    setSelected("inbox");
  };
  const selectSent = () => {
    setSelected("sent");
  };
  const selectJunk = () => {
    setSelected("junk");
  };
  const selectDeleted = () => {
    setSelected("Deleted");
  };
  return (
    <div className="flex h-dvh w-full flex-col max-w-screen-xl border border-gray-50 rounded-lg mt-20">
      <div className="flex w-full h-20 border rounded-lg border-gray-50 justify-center">
        <h1 className="text-lg p-2">My Mails</h1>
      </div>
      <div className="flex md:flex-row sm:flex-col h-full">
        <section className="w-2/5 h-full border border-l-0 border-t-0 rounded-lg border-gray-50">
          <h1 className="text-lg text-center border rounded-lg p-4">MailBox</h1>
          <div className="flex flex-col text-lg  mx-4">
            <button
              onClick={selectInbox}
              className="border p-2 my-2 w-auto rounded-md"
              type="button "
            >
              Inbox
            </button>
            <button
              onClick={selectSent}
              className="border p-2 my-2  w-auto rounded-md"
              type="button "
            >
              Sent
            </button>
            <button
              onClick={selectJunk}
              className="border p-2 my-2  w-auto rounded-md"
              type="button "
            >
              Junk
            </button>
            <button
              onClick={selectDeleted}
              className="border p-2 my-2  w-auto rounded-md"
              type="button "
            >
              Deleted
            </button>
          </div>
        </section>
        <section className="w-3/5 p-2  sm:w-full h-full border rounded-lg border-gray-50">
          <h1 className="text-lg text-center border-b-2 p-4">
            {selected === "inbox"
              ? "Inbox"
              : selected === "sent"
              ? "Sent"
              : selected === "junk"
              ? "Junk"
              : "Deleted"}
          </h1>
        </section>
      </div>
    </div>
  );
};

export default Mailbox;
