import React, { useEffect } from "react";
import { useState } from "react";

export const UserContext = React.createContext({
  username: "",
  password: "",
  isAdmin: true,
  setIsAdmin: () => null,
  setUsername: () => null,
  setPassword: () => null,
});

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    setUsername(localStorage.username);
  }, [localStorage]);

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        isAdmin,
        setIsAdmin,
        password,
        setPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
