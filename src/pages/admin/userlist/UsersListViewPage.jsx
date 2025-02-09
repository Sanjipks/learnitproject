import React, { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../../apis/Api";
import { toast } from "react-toastify";
import { useLogin } from "../../../context/LoginContext";
import UserListView from "../../../components/UserListViewTable";
import ConfirmDecision from "../../../components/modals/utilitycomponent/ConfirmDecision";
import Spinner from "../../../components/common/Spinner";

export default function UserListViewPage(props) {
  const [pagenumberlist, setPagenumberlist] = useState(1);
  const [userperpageListView, setUserperpageListView] = useState(10);
  const [totalUserscount, setTotalUserscount] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [pop, setPop] = useState(false);
  const [deletedId, setDeletedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { handleView } = props;

  const pagenumber = 1;

  const { loginInfo } = useLogin();
  const loggedinUserRole = loginInfo.userRole;

  const startIndex = (pagenumberlist - 1) * userperpageListView;
  const endIndex = startIndex + userperpageListView;

  let paginatedUserslistview = filteredUsers.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsers(loggedinUserRole, pagenumber);
        setFilteredUsers(data.allUsers),
          setAllUsers(data.allUsers),
          setTotalUserscount(data.totalEntries);
      } catch (error) {
        throw new Error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handlePrevPageList = () => {
    if (pagenumberlist > 1) {
      setPagenumberlist(pagenumberlist - 1);
    }
  };
  const handleNextPageList = () => {
    if (pagenumberlist >= 1) {
      setPagenumberlist(pagenumberlist + 1);
    }
  };

  const handleuserperpage = (number) => {
    setUserperpageListView(number);
    setPagenumberlist(1);
  };

  //first step to remove user, passed as removeuser props and it recieves user id from child and set Pop true to dispaly component created as modal
  const handleRemove = async (id) => {
    setDeletedId(id);
    setPop(true);
  };

  //user delete decision can be made with received true or false state from child compo
  const handlePop = async (state) => {
    setPop(false);
    if (state && deletedId !== null) {
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
      }
    }
  };

  const handleSearch = (input) => {
    setSearchInput(input);

    const filteredUsers = allUsers.filter((user) =>
      user.user_name.toLowerCase().includes(input.toLowerCase())
    );

    setFilteredUsers(filteredUsers);
  };

  return (
    <>
      <div className="min-h-dvh h-auto flex flex-col justify-items-center justify-between overflow-x-scroll bg-gray-500 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
        <div className="md:my-20 xm:my-10">
          <div className="w-full flex mx-auto justify-center bg-gray-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-4 ">
              Users
            </h1>
          </div>
        </div>
        <div className="flex justify-self-center mx-auto">
          {loading ? (
            <Spinner />
          ) : (
            <UserListView
              allusers={allUsers}
              removeUser={handleRemove}
              handlesetuserperpagelistview={handleuserperpage}
              paginatedUsers={paginatedUserslistview}
              usernumber={userperpageListView}
              handleSearchInput={handleSearch}
            />
          )}
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
          )}

          <button onClick={handleView}> Switch to Card View </button>

          <div className="flex max-w-screen-xl w-full justify-between my-2 float-end">
            <button
              disabled={pagenumberlist === 1}
              onClick={handlePrevPageList}
              className="items-center px-4 h-8 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-100 bg-gray-800 rounded-s border  disabled:hover:bg-gray-100 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
              className="items-center px-4 h-8 text-sm font-medium text-white  disabled:cursor-not-allowed disabled:bg-gray-100 disabled:hover:bg-gray-100 bg-gray-800  rounded-e border border-gray-700  hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
      {pop && (
        <ConfirmDecision
          handlePopAction={handlePop}
          typo="Are you sure you want to delete this user?"
        />
      )}
    </>
  );
}
