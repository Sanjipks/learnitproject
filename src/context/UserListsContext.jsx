import { createContext, useContext } from "react";

const UserListsContext = createContext();

export const useUserLists = () => {
  return useContext(UserListsContext);
};

export const UserListsProvider = () => {
  useState([]);

  return (
    <UserListsContext.Provider value={""}>{children}</UserListsContext.Provider>
  );
};
