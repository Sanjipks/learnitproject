import React from "react";
import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../../apis/Api";
import { toast } from "react-toastify";
import { useLogin } from "../../../context/LoginContext";
import UserListView from "../../../components/UserListViewTable";
import DeleteDecision from "../../../modals/DeleteDecision";

export default function UserListViewPage(props) {
  const [pagenumberlist, setPagenumberlist] = useState(1);
  const [userperpageListView, setUserperpageListView] = useState(10);
  const [totalUserscount, setTotalUserscount] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [pop, setPop] = useState(false);
  const [deletedId, setDeletedId] = useState(null);
  const { handleView } = props;

  const pagenumber = 1;

  const loggedinUserInfo = useLogin();
  const loggedinUserRole = loggedinUserInfo.userRole;

  const startIndex = (pagenumberlist - 1) * userperpageListView;
  const endIndex = startIndex + userperpageListView;

  let paginatedUserslistview = filteredUsers.slice(startIndex, endIndex);

  try {
    useEffect(() => {
      getUsers(loggedinUserRole, pagenumber).then((data) => {
        setFilteredUsers(data.allUsers),
          setAllUsers(data.allUsers),
          setTotalUserscount(data.totalEntries);
      });
    }, []);
    console.log("length");
  } catch (error) {
    throw new Error("Error:", error);
  }

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

  // const handleRemove = async (id) => {
  //   const userConfirmed = window.confirm(
  //     "Are you sure you want to remove this user?"
  //   );
  //   if (!userConfirmed) return;
  //   try {
  //     const response = await deleteUser(id, loggedinUserRole);

  //     const data = await response.json();

  //     if (response.ok) {
  //       toast(data.message);
  //       setAllUsers(allUsers.filter((user) => user.user_id !== id));
  //     } else {
  //       console.error("Failed to remove user");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const handlePop = (state) => {
    setConfirmDelete(state);
  };

  const handleRemove = async (id) => {
    setDeletedId(id);
    setPop(true);
  };

  useEffect(() => {
    if (confirmDelete && deletedId !== null) {
      const deleteUserAsync = async () => {
        try {
          const response = await deleteUser(deletedId, loggedinUserRole);
          const data = await response.json();

          if (response.ok) {
            toast(data.message);
            setFilteredUsers(
              allUsers.filter((user) => user.user_id !== deletedId)
            );
          } else {
            console.error("Failed to remove user");
          }
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setDeletedId(null); // Reset deletedId after operation
          setConfirmDelete(false); // Reset confirmDelete after operation
        }
      };

      deleteUserAsync();
    }
  }, [confirmDelete, deletedId, loggedinUserRole, allUsers, setFilteredUsers]);

  const handleSearch = (input) => {
    setSearchInput(input);

    const filteredUsers = allUsers.filter((user) =>
      user.user_name.toLowerCase().includes(input.toLowerCase())
    );

    setFilteredUsers(filteredUsers);
  };

  console.log("input", searchInput);

  return (
    <>
      {pop ? <DeleteDecision handlepop={handlePop} /> : null}
      <div className="min-h-dvh h-auto flex flex-col justify-items-center justify-between bg-gray-500 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
        <h1 className="m-10 text-center text-xl">USERS</h1>
        <div className="flex justify-self-center mx-auto">
          <UserListView
            allusers={allUsers}
            removeUser={handleRemove}
            handlesetuserperpagelistview={handleuserperpage}
            paginatedUsers={paginatedUserslistview}
            usernumber={userperpageListView}
            handleSearchInput={handleSearch}
          />
        </div>
        <div className="flex flex-col items-center">
          {searchInput ? (
            <div>
              {filteredUsers.length !== 0 ? (
                <span className="text-sm text-gray-950 dark:text-gray-400">
                  Showing{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {startIndex + 1}
                  </span>{" "}
                  {startIndex !== null ? " to " : null}
                  {endIndex !== null ? (
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {filteredUsers.length < endIndex
                        ? filteredUsers.length
                        : endIndex}
                    </span>
                  ) : null}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {" of "} {filteredUsers.length}
                  </span>{" "}
                  Total Users
                </span>
              ) : (
                "NO USERS TO DISPLAY"
              )}
            </div>
          ) : (
            <div>
              {allUsers.length !== 0 ? (
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
              ) : (
                "NO USERS TO DISPLAY"
              )}
            </div>
          )}

          <button onClick={handleView}> Switch to Card View </button>

          <div className="flex max-w-screen-xl w-full justify-between my-2 float-end">
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
                  Math.ceil(totalUserscount / userperpageListView) ||
                pagenumberlist ===
                  Math.ceil(filteredUsers.length / userperpageListView) ||
                allUsers.length === 0
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
  );
}
