import React, { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthContextProvider = AuthContext.Provider;

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  return (
    <AuthContextProvider value={{ userData, setUserData }}>
      {children}
    </AuthContextProvider>
  );
};

export default AuthProvider;
