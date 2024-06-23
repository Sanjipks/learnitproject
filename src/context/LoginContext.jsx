import React, { useContext, useState } from "react";

const LoginContext = React.createContext();
const LoginUpdateContext = React.createContext();

export function useLogin() {
  return useContext(LoginContext);
}

export function useLoginUpdate() {
  return useContext(LoginUpdateContext);
}

export default function LoginProvider({ children }) {
  const [logininfo, setLogininfo] = useState({
    loginState: localStorage.getItem("loginState"),
    token: localStorage.getItem("token"),
    userEmail: localStorage.getItem("userEmail"),
    userName: localStorage.getItem("userName"),
    userRole: localStorage.getItem("userRole"),
  });
  console.log("login", logininfo);

  const loginMode = (updates) => {
    setLogininfo((prevInfo) => ({
      ...prevInfo,
      ...updates,
    }));

    localStorage.setItem("loginState", logininfo.loginState);
    localStorage.setItem("token", logininfo.token);
    localStorage.setItem("userEmail", logininfo.userEmail);
    localStorage.setItem("userName", logininfo.userName);
    localStorage.setItem("userRole", logininfo.userRole);
  };

  return (
    <LoginContext.Provider value={logininfo}>
      <LoginUpdateContext.Provider value={loginMode}>
        {children}
      </LoginUpdateContext.Provider>
    </LoginContext.Provider>
  );
}
