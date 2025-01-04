import { useState, useContext } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../Context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const navigate = useNavigate();

  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

  // Accessing Captain Context
  const { setCaptainData } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newCaptain = {
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    const response = await axios.post(
      `${VITE_BASE_URL}/captains/register`,
      newCaptain
    );
    if (response.status === 201) {
      const data = response.data;
      console.log(data);
      setCaptainData(data.captain);
      localStorage.setItem("token", data.captain.token);
      navigate("/captain-home");
    }
    // Clear form fields
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };

  return (
    <div className="flex h-screen flex-col justify-between">
      <div className="rounded-lg bg-white w-full max-w-sm text-center p-4 h-max px-4 mt-6">
        <Heading label={"Sign-Up"} />
        <SubHeading label={"Enter your information to create an account"} />

        <form onSubmit={submitHandler}>
          {/* Full Name */}
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

          {/* Vehicle Details */}
          <div className="flex flex-col">
            <InputBox
              label={"Vehicle Details"}
              className="bg-[#eeeeee]"
              placeholder={"Vehicle Color"}
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />
            <InputBox
              className="bg-[#eeeeee]"
              placeholder={"Vehicle Plate"}
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
            />
            <InputBox
              className="bg-[#eeeeee]"
              placeholder={"Vehicle Capacity"}
              type="number"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
            />
            <InputBox
              className="bg-[#eeeeee]"
              label="Vehicle Type"
              placeholder="Select Vehicle Type"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              type="select"
              options={["auto", "car", "motorcycle"]}
            />
          </div>

          {/* Email */}
          <InputBox
            className="bg-[#eeeeee]"
            label={"Email"}
            placeholder={"email@example.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <InputBox
            className="bg-[#eeeeee]"
            label={"Password"}
            placeholder={"Password"}
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Submit Button */}
          <Button label={"Register"} type="submit" />

          {/* Bottom Warning */}
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Log-in"}
            to={"/captain-login"}
          />
        </form>
      </div>

      {/* Login as User */}
      <div className="p-2 h-max px-4 mb-6">
        <Link
          to="/login"
          className="flex justify-center text-white rounded-md mt-4 p-2 text-lg font-medium focus:outline-none focus:ring focus:ring-green-600 hover:bg-green-600 shadow-md w-full bg-green-500"
        >
          Login as a User
        </Link>
      </div>
    </div>
  );
}
