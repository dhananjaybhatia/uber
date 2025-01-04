import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const UserDataContext = createContext();

// eslint-disable-next-line react/prop-types
export default function UserContext({ children }) {
  const [userData, setUserData] = useState({
    fullName: {
      firstName: "",
      lastName: "",
    },
    email: "",
    password: "",
  });
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
}
