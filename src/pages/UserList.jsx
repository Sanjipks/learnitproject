import React from "react";
import { useEffect, useState } from "react";
import User from "../components/User";
// import { getUsers } from "../apis/Api";
import { toast } from "react-toastify";

export default function UserList() {
  const [userlist, setUserlist] = useState([]);

  // try {
  //   useEffect(() => {
  //     getUsers().then(setUserlist);
  //   }, []);
  //   console.log(userlist.length);
  // } catch (error) {
  //   throw new Error("Error:", error);
  // }

  // useEffect(() => {
  //   async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/users/", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       const data = await response.json();
  //       console.log(data, "uuuserdata");

  //       if (response.ok) {
  //         setUserlist(data.map((userlist) => userlist));
  //       } else {
  //         console.error("Failed to remove user");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
  // }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:3000/users/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data, "uuuserdata");

        if (response.ok) {
          setUserlist(data);
        } else {
          console.error("Failed to fetch user list");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  }, []);

  console.log(userlist.length);

  const handleRemove = async (id) => {
    console.log("handleremoveclick", handleRemove);
    const userConfirmed = window.confirm(
      "Are you sure you want to remove this user?"
    );
    if (!userConfirmed) return;
    try {
      const response = await fetch(`http://localhost:3000/users/${id}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        toast(data.message);
        setUserlist(userlist.filter((user) => user.id !== id));
      } else {
        console.error("Failed to remove user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-dvh h-auto flex flex-col justify-items-center bg-gray-500 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
      <h1 className="m-10 text-center text-xl">USERS</h1>
      <div className="flex justify-self-center mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {userlist.map((user, id) => (
            <div key={id} className="p-2">
              <User
                key={user.user_id}
                user={user.user_name}
                userId={user.user_id}
                userEmail={user.user_email}
                removeUser={handleRemove}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div>
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              1
            </span>{" "}
            to{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              10
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              100
            </span>{" "}
            Entries
          </span>
        </div>

        <div className="flex justify-between my-2 xs:mt-0">
          <button className="items-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Prev
          </button>
          <button className="items-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
