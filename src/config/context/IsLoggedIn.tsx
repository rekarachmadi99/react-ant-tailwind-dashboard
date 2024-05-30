import React, { createContext, useState } from "react";

const IsLoginContext = createContext<any>(null);

const IsLoginContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <IsLoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </IsLoginContext.Provider>
  );
};

export const IsLogin = IsLoginContext;
export default IsLoginContextProvider;
