import { useContext, useState } from "react";
import axios from "axios";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../Context/UserContext";

export default function UserLogin() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { setUserData } = useContext(UserDataContext);

  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${VITE_BASE_URL}/users/register`,
      newUser
    );
    if (response.status === 201) {
      const data = response.data;
      setUserData(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex h-screen flex-col justify-between">
      <div className="rounded-lg bg-white w-full max-w-sm text-center p-2 h-max px-4 mt-6">
        <Heading label={"Sign-Up"} />
        <SubHeading label={"Enter your information to create an account"} />
        <form action="" onSubmit={submitHandler}>
          <div className="flex flex-col">
            <InputBox
              className="bg-[#eeeeee] "
              placeholder={"first name"}
              label={"Full Name"}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <InputBox
              className="bg-[#eeeeee] mt-0 "
              placeholder={"last name"}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <InputBox
            className="bg-[#eeeeee]"
            label={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"email@example.com"}
          />
          <InputBox
            className="bg-[#eeeeee]"
            label={"Password"}
            value={password}
            placeholder={"password"}
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button label={"Create account"} type="submit" />
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Log-in"}
            to={"/login"}
          />
        </form>
      </div>
      <div className="p-2 h-max px-4 mb-6">
        <Link
          to="/captain-login"
          className="flex justify-center text-white rounded-md mt-4 p-2 text-lg font-medium focus:outline-none focus:ring focus:ring-green-600 hover:bg-green-600 shadow-md w-full bg-green-500"
        >
          Login as a Driver
        </Link>
      </div>
    </div>
  );
}
