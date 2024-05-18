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
    loginState: "",
    token: "",
    email: "",
    userName: "",
    userRole: "",
  });

  console.log("login", logininfo.loginState);

  const loginMode = (updates) => {
    setLogininfo((prevLogin) => ({
      ...prevLogin,
      ...updates,
    }));
  };

  return (
    <LoginContext.Provider value={logininfo}>
      <LoginUpdateContext.Provider value={loginMode}>
        {children}
      </LoginUpdateContext.Provider>
    </LoginContext.Provider>
  );
}
