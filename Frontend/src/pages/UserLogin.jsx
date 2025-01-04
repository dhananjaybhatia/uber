import { useContext, useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../Context/UserContext";
import axios from "axios";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setLoading] = useState(false); // Loading state for button
  const [, setError] = useState(""); // Error state for API response

  const { setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();

  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validation before API call
    if (!email || !password) {
      setError("Email and Password are required.");
      return;
    }

    const userData = {
      email,
      password,
    };

    try {
      setLoading(true); // Start loading
      setError(""); // Clear previous errors

      const response = await axios.post(
        `${VITE_BASE_URL}/users/login`,
        userData
      );

      if (response.status === 200) {
        const data = response.data;
        setUserData(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (error) {
      // Handle error responses
      if (error.response) {
        alert(error.response.data.msg || "Invalid email or password");
      } else {
        alert("Network error. Please try again later.");
      }
    } finally {
      setLoading(false); // Stop loading
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="flex h-screen flex-col justify-between">
      <div className="rounded-lg bg-white w-full max-w-sm text-center p-2 h-max px-4 mt-6">
        <Heading label={"User Login"} />
        <SubHeading label={"Please enter your registered email and password"} />
        <form action="" onSubmit={submitHandler}>
          <InputBox
            className="bg-[#eeeeee]"
            label={"Email"}
            value={email}
            placeholder={"email@example.com"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            className="bg-[#eeeeee]"
            label={"Password"}
            value={password}
            placeholder={"password"}
            onChange={(e) => setPassword(e.target.value)}
            type={"password"}
          />
          <Button label={"Login"} type="submit" />
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Create account"}
            to={"/signup"}
          />
        </form>
      </div>
      <div className="p-2 h-max px-4 mb-6">
        <Link
          to="/captain-login"
          className="flex justify-center text-white rounded-md mt-4 p-2 text-lg font-medium focus:outline-none focus:ring focus:ring-green-600 hover:bg-green-600 shadow-md w-full bg-green-500"
        >
          Login as a Driver{" "}
        </Link>
      </div>
    </div>
  );
}
