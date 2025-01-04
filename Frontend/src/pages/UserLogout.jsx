import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserLogout() {
  const token = localStorage.getItem("token");
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        if (!token) {
          console.warn("No token found, redirecting to login.");
          navigate("/login");
          return;
        }

        // Immediately remove token from localStorage to avoid duplicate calls
        localStorage.removeItem("token");

        // Call logout API (if backend supports token invalidation)
        await axios.get(`${VITE_BASE_URL}/users/logout`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Successfully logged out");
        navigate("/login");
      } catch (error) {
        console.error(
          "Logout failed:",
          error.response?.data?.message || error.message
        );
      } finally {
        navigate("/login");
      }
    };

    logout();
  }, [token, navigate, VITE_BASE_URL]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      <p className="ml-4 text-lg font-medium">Logging out...</p>
    </div>
  );
}
