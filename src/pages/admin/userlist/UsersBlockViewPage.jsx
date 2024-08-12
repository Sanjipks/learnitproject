import React from "react";
import { useEffect, useState } from "react";
import UserBlockView from "../../../components/UserBlockViewCard";
import { deleteUser, getUsers } from "../../../apis/Api";
import { toast } from "react-toastify";
import { useLogin } from "../../../context/LoginContext";

export default function UsersBlockViewPage(props) {
  const [userlist, setUserlist] = useState([]);
  const [pagenumber, setPagenumber] = useState(1);
  const [userperpage, setUserperpage] = useState(0);
  const [totalUserscount, setTotalUserscount] = useState(0);
  const [deletedUser, setDeletedUser] = useState(null);
  const [expandeduser, setExpandeduser] = useState(null);

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
    }, [pagenumber, deletedUser]);
  } catch (error) {
    throw new Error("Error:", error);
  }

  const handleRemove = async (deletedId) => {
    setDeletedUser(deletedId);
    const userConfirmed = window.confirm(
      "Are you sure you want to remove this user?"
    );
    if (!userConfirmed) return;
    try {
      const response = await deleteUser(deletedId, loggedinUserRole);
      const data = await response.json();

      if (response.ok) {
        toast(data.message);
        setUserlist(userlist.filter((user) => user.id !== deletedId));
      } else {
        console.error("Failed to remove user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="min-h-dvh h-auto flex flex-col justify-items-start justify-between bg-gray-500 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
        <div className="md:my-20 xm:my-10">
          <div className="w-full flex mx-auto justify-center bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-4 ">
              Users
            </h1>
          </div>
        </div>
        <div className="flex  justify-start mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {/* <div className="md:w-4/5 flex flex-row flex-wrap justify-center mx-auto"> */}
            {userlist.map((user, id) => (
              <div key={id} className="p-2">
                <UserBlockView
                  key={user.user_id}
                  user={user.user_name}
                  userId={user.user_id}
                  userEmail={user.user_email}
                  userImage={user.user_image}
                  removeUser={handleRemove}
                  expandeduser={expandeduser}
                  setExpandeduser={setExpandeduser}
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
