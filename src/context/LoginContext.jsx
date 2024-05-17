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
    loginState: "",
    token: "",
    email: "",
    userName: "",
    userRole: "",
  });

  const loginMode = (updates) => {
    setLogin((prevLogin) => ({
      ...prevLogin,
      ...updates,
    }));
  };

  return (
    <LoginContext.Provider value={login}>
      <LoginUpdateContext.Provider value={loginMode}>
        {children}
      </LoginUpdateContext.Provider>
    </LoginContext.Provider>
  );
}
