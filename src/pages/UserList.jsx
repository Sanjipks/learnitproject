import React from "react";
import { useEffect, useState } from "react";
import User from "../components/User";
import { getUsers } from "../apis/Api";

export default function UserList() {
  const [userlist, setUserlist] = useState([]);

  try {
    useEffect(() => {
      getUsers().then(setUserlist);
    }, []);
  } catch (error) {
    throw new Error("Error:", error);
  }

  return (
    <div className="flex flex-col justify-items-center  bg-gray-500 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
      <h1 className="m-10 text-center text-xl">USERS</h1>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {userlist.map((user, id) => (
            <div key={id} className="p-2">
              <User
                key={user.user_id}
                user={user.user_name}
                userId={user.user_id}
                userEmail={user.user_email}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
