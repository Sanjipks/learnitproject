import React, { useState } from "react";
import { useLogin } from "../../../context/LoginContext";
import UserListViewPage from "./UsersListViewPage";
import UsersBlockViewPage from "./UsersBlockViewPage";
import Login from "../../common/Login";

const UsersList = () => {
  const [listView, setListView] = useState(true);

  const loginInfo = useLogin();
  const loginState = loginInfo.loginState;
  const userRole = loginInfo.userRole;

  const handleSwitchView = () => {
    setListView((prev) => !prev);
  };

  return (
    <>
      {userRole === "admin" && loginState === "true" ? (
        <>
          {listView ? (
            <UserListViewPage handleView={handleSwitchView} />
          ) : (
            <UsersBlockViewPage handleView={handleSwitchView} />
          )}
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default UsersList;
