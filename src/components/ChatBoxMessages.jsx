import React, { useRef, useState, useEffect } from "react";
import io from "socket.io-client";
import { useLogin } from "../context/LoginContext";
import {
  TimeStampToTime,
  TimeStampToDay,
  TimeStampToMonth,
  TimeStampToYear,
} from "../utility functions/TimestampToRE";
import { useMessaging } from "../context/MessagingContext";

const BEHOST = import.meta.env.VITE_BELC;

const socket = io(BEHOST, {
  withCredentials: true,
});

const ChatBoxMessages = (props) => {
  const {
    selectedUserId,
    send,
    setSend,
    newMessage,
    setNewMessage,
    userId,
    attachedFile,
  } = props;

  const { setMessageUpdate } = useMessaging();

  const date = new Date();
  const currentYear = date.getFullYear();
  const currentDay = date.toLocaleDateString("en-US", { weekday: "long" });
  const currentMonth = date.toLocaleString("en-US", { month: "long" });

  const { loginInfo } = useLogin();
  const loggedInUserId = loginInfo.userId;
  const [messages, setMessages] = useState([]);
  const [down, setDown] = useState(false);
  const [pastMessages, setPastMessages] = useState([]);

  const [viewMessages, setViewMessages] = useState(-5);

  const messageEndRef = useRef(null);
  const messageMoveUpRef = useRef(null);

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      const messageData = {
        senderId: loggedInUserId,
        receiverId: selectedUserId,
        message: newMessage,
        timestamp: new Date().toISOString(),
      };
      socket.emit("message", messageData);
      setNewMessage("");
      setMessageUpdate((prev) => !prev);
      setSend(false);
    }
  };

  useEffect(() => {
    handleSend();
  }, [send]);

  const loadMessagesNumber = viewMessages;

  useEffect(() => {
    // associate user and load past messages
    socket.emit("user_connected", loggedInUserId);
    socket.emit("fetch_past_messages", userId, loadMessagesNumber);

    // listen for past messages on connection
    socket.on("past_messages", (pastMessages) => {
      setDown(true);
      setPastMessages(
        pastMessages.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        )
      );
    });

    socket.on("message", (receivedMessage) => {
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    });

    // clean up the listeners on component unmount
    return () => {
      socket.off("message");
      socket.off("past_messages");
    };
  }, [viewMessages, send]);

  // sort messages by timestamp for accurate display
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  const handleScroll = () => {
    const container = messageMoveUpRef.current;

    if (container.scrollTop === 0) {
      setViewMessages((prev) => prev - 20);
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, down]);

  return (
    <div
      ref={messageMoveUpRef}
      onScroll={handleScroll}
      className="flex flex-col h-64 overflow-y-auto p-3 bg-white rounded-lg shadow-inner"
    >
      {userId && (
        <>
          {pastMessages.map((msg, index) => {
            return (
              <div
                key={index}
                className={`my-1 p-2 rounded-lg w-36 ${
                  msg.sender_id == loggedInUserId ? "self-end" : "self-start"
                }`}
              >
                <div
                  className={`my-1 py-2 text-sm rounded-lg w-48 text-gray-900 ${
                    msg.sender_id == loggedInUserId
                      ? " self-end"
                      : " self-start"
                  }`}
                >
                  {(currentMonth == TimeStampToMonth(msg.timestamp)
                    ? ""
                    : TimeStampToMonth(msg.timestamp) + ", ") +
                    (currentYear == TimeStampToYear(msg.timestamp)
                      ? ""
                      : TimeStampToYear(msg.timestamp)) +
                    " " +
                    (currentDay == TimeStampToDay(msg.timestamp)
                      ? "Today"
                      : TimeStampToDay(msg.timestamp)) +
                    ", " +
                    TimeStampToTime(msg.timestamp)}
                </div>
                <div
                  className={`my-1 p-2 rounded-lg w-auto ${
                    msg.sender_id == loggedInUserId
                      ? "bg-blue-500 text-white self-end"
                      : "bg-gray-300 text-black self-start"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            );
          })}

          <>
            {
              <>
                {sortedMessages.map((msg, index) => {
                  return (
                    <div
                      key={index}
                      className={`my-1 p-2 rounded-lg w-36 ${
                        msg.senderId == loggedInUserId
                          ? "self-end"
                          : "self-start"
                      }`}
                    >
                      <div
                        className={`my-1 py-2 text-sm rounded-lg w-48 text-gray-900 ${
                          msg.senderId == loggedInUserId
                            ? " self-end"
                            : " self-start"
                        }`}
                      >
                        {(currentMonth == TimeStampToMonth(msg.timestamp)
                          ? ""
                          : TimeStampToMonth(msg.timestamp) + ", ") +
                          (currentYear == TimeStampToYear(msg.timestamp)
                            ? ""
                            : TimeStampToYear(msg.timestamp)) +
                          " " +
                          (currentDay == TimeStampToDay(msg.timestamp)
                            ? "Today"
                            : TimeStampToDay(msg.timestamp)) +
                          ", " +
                          TimeStampToTime(msg.timestamp)}
                      </div>
                      <div
                        className={`my-1 p-2 rounded-lg w-auto ${
                          msg.senderId == loggedInUserId
                            ? "bg-blue-500 text-white self-end"
                            : "bg-gray-300 text-black self-start"
                        }`}
                      >
                        {msg.message}
                      </div>
                      <div ref={messageEndRef} />
                    </div>
                  );
                })}
              </>
            }
          </>
        </>
      )}
    </div>
  );
};

export default ChatBoxMessages;
