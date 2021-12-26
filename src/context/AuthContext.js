import { createContext, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    email: null,
    username: null,
    id: 0,
    isLoggedIn: false
  })



  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ username: null, id: 0, isLoggedIn: false });
  };

    return (
      <AuthContext.Provider value={{auth, setAuth, logout}}>
        {children}
      </AuthContext.Provider>
    )
    }