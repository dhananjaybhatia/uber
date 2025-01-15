import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../Context/CaptainContext";

// eslint-disable-next-line react/prop-types
export default function CaptainProtectedWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const { setCaptainData } = useContext(CaptainDataContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const validateToken = async () => {
      try {
        if (!token) {
          navigate("/captain-login");
          return;
        }

        // 🛡️ Validate Token with Backend
        const response = await axios.get(`${VITE_BASE_URL}/captains/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API Response:", response.data); // Debugging: Log the response

        if (response.status === 200) {
          setCaptainData(response.data.captain); // Populate context with user data
        } else {
          localStorage.removeItem("token");
          navigate("/captain-home");
        }
      } catch (error) {
        console.error("Token validation failed:", error.message);
        localStorage.removeItem("token");
        navigate("/captain-login");
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [token, navigate, setCaptainData, VITE_BASE_URL]);

  // Show loading spinner while validating token
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  // Render children after successful validation
  return <>{children}</>;
}
