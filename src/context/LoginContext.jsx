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
  const [login, setLogin] = useState("Log in");

  const loginMode = () => {
    // setLogin(login === false ? true : false);
    setLogin(login === "Log in" ? "Log out" : "Log in");
  };

  return (
    <LoginContext.Provider value={login}>
      <LoginUpdateContext.Provider value={loginMode}>
        {children}
      </LoginUpdateContext.Provider>
    </LoginContext.Provider>
  );
}
