import React from "react";
import { useEffect, useState } from "react";
import User from "../components/User";
// import { getUsers } from "../apis/Api";
import { toast } from "react-toastify";
import { useLogin } from "../context/LoginContext";
import UserListView from "../components/UserListView";

export default function UserList() {
  const [userlist, setUserlist] = useState([]);
  const [pagenumber, setPagenumber] = useState(1);
  const [pagenumberlist, setPagenumberlist] = useState(1);
  const [userperpage, setUserperpage] = useState(0);
  const [userperpageListView, setUserperpageListView] = useState(10);
  const [totalUserscount, setTotalUserscount] = useState(0);
  const [totalUsers, setTotalUsers] = useState([]);
  const [listView, setListView] = useState(false);

  const startIndex = (pagenumberlist - 1) * userperpageListView;
  const endIndex = startIndex + userperpageListView;
  console.log("pagelist", pagenumberlist);

  let paginatedUserslistview = totalUsers.slice(startIndex, endIndex);

  const loggedinUserInfo = useLogin();
  const loggedinUserRole = loggedinUserInfo.userRole;

  const handleSwitchView = () => {
    setListView((prev) => !prev);
  };

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
  const handlePrevPageList = () => {
    if (pagenumberlist > 1) {
      setPagenumberlist(pagenumberlist - 1);
    }
  };
  const handleNextPageList = () => {
    console.log(handleNextPageList);
    if (pagenumberlist >= 1) {
      setPagenumberlist(pagenumberlist + 1);
      console.log(pagenumberlist);
    }
  };

  const handleuserperpage = (number) => {
    setUserperpageListView(number);
  };

  console.log("pageNumber" + pagenumber + "......" + userlist.length);
  // try {
  //   useEffect(() => {
  //     getUsers().then(setUserlist);
  //   }, []);
  //   console.log(userlist.length);
  // } catch (error) {
  //   throw new Error("Error:", error);
  // }

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/page=${pagenumber}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (response.ok) {
          setUserlist(data.paginatedUsers);
          setTotalUsers(data.totalUsers);
          setUserperpage(data.usersPerPage);
          setTotalUserscount(data.totalEntries);
        } else {
          console.error("Failed to fetch user list");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  }, [pagenumber]);

  console.log(userlist.length);

  const handleRemove = async (id) => {
    console.log("handleremoveclick", handleRemove);
    console.log("id", id);
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
        body: JSON.stringify({ loggedinUserRole }),
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
    <>
      {listView ? (
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
                      removeUser={handleRemove}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div>
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
              </div>
              <button onClick={handleSwitchView}> List View </button>

              <div className="flex w-3/5 justify-between my-2  float-end">
                <button
                  disabled={pagenumber === 1}
                  onClick={handlePrevPage}
                  className="items-center px-4 h-8 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300 bg-gray-800 rounded-s border  disabled:hover:bg-gray-300 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  &larr; Prev
                </button>
                <button
                  disabled={
                    pagenumber === Math.ceil(totalUserscount / userperpage)
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
      ) : (
        <>
          <div className="min-h-dvh h-auto flex flex-col justify-items-center justify-between bg-gray-500 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
            <h1 className="m-10 text-center text-xl">USERS</h1>
            <div className="flex justify-self-center mx-auto">
              <UserListView
                totalusers={totalUsers}
                removeUser={handleRemove}
                handlesetuserperpagelistview={handleuserperpage}
                paginatedUsers={paginatedUserslistview}
                usernumber={userperpageListView}
              />
            </div>
            <div className="flex flex-col items-center">
              <div>
                <span className="text-sm text-gray-950 dark:text-gray-400">
                  Showing{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {startIndex + 1}
                  </span>{" "}
                  {startIndex !== null ? " to " : null}
                  {endIndex !== null ? (
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {totalUserscount < endIndex ? totalUserscount : endIndex}
                    </span>
                  ) : null}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {" of "} {totalUserscount}
                  </span>{" "}
                  Total Users
                </span>
              </div>
              <button onClick={handleSwitchView}> Card View </button>

              <div className="flex w-3/5 justify-between my-2  float-end">
                <button
                  disabled={pagenumberlist === 1}
                  onClick={handlePrevPageList}
                  className="items-center px-4 h-8 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300 bg-gray-800 rounded-s border  disabled:hover:bg-gray-300 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  &larr; Prev
                </button>
                <button
                  disabled={
                    pagenumberlist ===
                    Math.ceil(totalUserscount / userperpageListView)
                  }
                  onClick={handleNextPageList}
                  className="items-center px-4 h-8 text-sm font-medium text-white  disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-300 bg-gray-800  rounded-e border border-gray-700  hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next &rarr;
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
