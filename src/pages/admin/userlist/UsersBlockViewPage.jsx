import React from "react";
import { useEffect, useState } from "react";
import User from "../../../components/UserBlockViewCard";
import { deleteUser, getUsers } from "../../../apis/Api";
import { toast } from "react-toastify";
import { useLogin } from "../../../context/LoginContext";

export default function UsersBlockViewPage(props) {
  const [userlist, setUserlist] = useState([]);
  const [pagenumber, setPagenumber] = useState(1);
  const [userperpage, setUserperpage] = useState(0);
  const [totalUserscount, setTotalUserscount] = useState(0);

  const { handleView } = props;

  const { loginInfo } = useLogin();
  const loggedinUserRole = loginInfo.userRole;

  const handlePrevPage = () => {
    if (pagenumber > 1) {
      setPagenumber(pagenumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pagenumber >= 0) {
      setPagenumber(pagenumber + 1);
    }
  };

  try {
    useEffect(() => {
      getUsers(loggedinUserRole, pagenumber).then((data) => {
        setUserlist(data.paginatedUsers),
          setUserperpage(data.usersPerPage),
          setTotalUserscount(data.totalEntries);
      });
    }, [pagenumber, userlist]);
    console.log("length");
  } catch (error) {
    throw new Error("Error:", error);
  }

  const handleRemove = async (deletedId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to remove this user?"
    );
    if (!userConfirmed) return;
    try {
      const response = await deleteUser(deletedId, loggedinUserRole);
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

  const handleUpdateUser = () => {
    "todo";
  };

  return (
    <>
      <div className="min-h-dvh h-auto flex flex-col justify-items-start justify-between bg-gray-500 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
        <h1 className="m-10 text-center text-xl">USERS</h1>
        <div className="flex  justify-start mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {/* <div className="md:w-4/5 flex flex-row flex-wrap justify-center mx-auto"> */}
            {userlist.map((user, id) => (
              <div key={id} className="p-2">
                <User
                  key={user.user_id}
                  user={user.user_name}
                  userId={user.user_id}
                  userEmail={user.user_email}
                  userImage={user.user_image}
                  removeUser={handleRemove}
                  editUser={handleUpdateUser}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div>
            {userlist ? (
              <span className="text-sm text-gray-950 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {pagenumber * userperpage - (userperpage - 1)}
                </span>{" "}
                {userlist.length !== 1 ? " to " : null}
                {userlist.length !== 1 ? (
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {(pagenumber - 1) * userperpage + userlist.length}
                  </span>
                ) : null}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {" of "} {totalUserscount}
                </span>{" "}
                Total Users
              </span>
            ) : (
              "NO USERS TO DISPLAY"
            )}
          </div>
          <button onClick={handleView}> Switch List View </button>

          <div className="flex max-w-screen-xl w-full justify-between my-2 float-end">
            <button
              disabled={pagenumber === 1}
              onClick={handlePrevPage}
              className="items-center px-4 h-8 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300 bg-gray-800 rounded-s border  disabled:hover:bg-gray-300 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              &larr; Prev
            </button>
            <button
              disabled={
                pagenumber === Math.ceil(totalUserscount / userperpage) ||
                userlist.length === 0
              }
              onClick={handleNextPage}
              className="items-center px-4 h-8 text-sm font-medium text-white  disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-300 bg-gray-800  rounded-e border border-gray-700  hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
