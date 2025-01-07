import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../Context/UserContext";

// eslint-disable-next-line react/prop-types
export default function UserProtectedWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const { setUserData } = useContext(UserDataContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const validateToken = async () => {
      try {
        if (!token) {
          navigate("/login");
          return;
        }

        // 🛡️ Validate Token with Backend
        const response = await axios.get(`${VITE_BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUserData(response.data.user); // Populate context with user data
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [token, navigate, setUserData, VITE_BASE_URL]);

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
