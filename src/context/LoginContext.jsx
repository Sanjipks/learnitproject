import React, { createContext, useContext, useState } from "react";

const LoginContext = createContext();

export function useLogin() {
  return useContext(LoginContext);
}

export default function LoginProvider({ children }) {
  const [loginInfo, setLogininfo] = useState({
    loginState: localStorage.getItem("loginState"),
    token: localStorage.getItem("token"),
    userEmail: localStorage.getItem("userEmail"),
    userName: localStorage.getItem("userName"),
    userRole: localStorage.getItem("userRole"),
  });

  const loginInfoUpdate = (updates) => {
    setLogininfo((prevInfo) => {
      const updatedInfo = {
        ...prevInfo,
        ...updates,
      };

      localStorage.setItem("loginState", updatedInfo.loginState);
      localStorage.setItem("token", updatedInfo.token);
      localStorage.setItem("userEmail", updatedInfo.userEmail);
      localStorage.setItem("userName", updatedInfo.userName);
      localStorage.setItem("userRole", updatedInfo.userRole);

      return updatedInfo;
    });
  };

  return (
    <LoginContext.Provider value={{ loginInfo, loginInfoUpdate }}>
      {children}
    </LoginContext.Provider>
  );
}
