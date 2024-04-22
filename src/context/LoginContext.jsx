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
  const [login, setLogin] = useState({
    loginShow: "Log in",
    loginState: false,
  });

  const loginMode = () => {
    setLogin(login.loginState === false ? true : false);
    setLogin(login.loginShow === "Log in" ? "Log out" : "Log in");
  };

  return (
    <LoginContext.Provider value={[login.loginShow, login.loginState]}>
      <LoginUpdateContext.Provider value={loginMode}>
        {children}
      </LoginUpdateContext.Provider>
    </LoginContext.Provider>
  );
}
