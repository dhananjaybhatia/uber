import { useState, useContext } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../Context/CaptainContext";
import axios from "axios";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Accessing Captain Context
  const { setCaptainData } = useContext(CaptainDataContext);

  const navigate = useNavigate();
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

  const submitHandler = async (e) => {
    e.preventDefault();

    const captain = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${VITE_BASE_URL}/captains/login`,
        captain
      );

      if (response.status === 200) {
        const data = response.data;
        setCaptainData(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex h-screen flex-col justify-between">
      <div className="rounded-lg bg-white w-full max-w-sm text-center p-2 h-max px-4 mt-6">
        <Heading label={"Driver Login"} />
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
            label={"Join a fleet?"}
            buttonText={"Register as a Driver"}
            to={"/captain-signup"}
          />
        </form>
      </div>
      <div className="p-2 h-max px-4 mb-6">
        <Link
          to="/login"
          className="flex justify-center text-white rounded-md mt-4 p-2 text-lg font-medium focus:outline-none focus:ring focus:ring-green-600 hover:bg-green-600 shadow-md w-full bg-green-500"
        >
          Login as a User{" "}
        </Link>
      </div>
    </div>
  );
}
