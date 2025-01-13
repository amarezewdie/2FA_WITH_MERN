import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext();

export const useSessionContext = () => useContext(SessionContext);

const SessionContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
   try {
     const storedUser = JSON.parse(sessionStorage.getItem("user"));
     if (storedUser) {
       setIsLoggedIn(true);
       setUser(storedUser);
     }
   } catch (error) {
     console.error("Failed to parse user data from sessionStorage:", error);
     sessionStorage.removeItem("user"); // Clean up corrupted data
   } finally {
     setLoading(false);
   }
 }, []);

  //login
  const login = (userData) => {
    console.log(userData);
    setIsLoggedIn(true);
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
    console.log("user data", userData);
  };

  //logout
  const logout = (data) => {
    if (data) {
      setIsLoggedIn(false);
      setUser(null);
      sessionStorage.removeItem("user");
    }
  };
  return (
    <SessionContext.Provider
      value={{ login, isLoggedIn, user, logout, loading }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
