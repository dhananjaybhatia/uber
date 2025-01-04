import { useState, createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CaptainDataContext = createContext();

// Context Provider
// eslint-disable-next-line react/prop-types
export default function CaptainContext({ children }) {
  const [captainData, setCaptainData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Optional: Custom updater (if you want to add more logic)
  const updateCaptain = (data) => {
    setCaptainData(data);
  };

  const value = {
    captainData,
    setCaptainData,
    updateCaptain, // Include the custom updater
    isLoading,
    setIsLoading,
    error,
    setError,
  };

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
}
