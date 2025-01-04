import { Link } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";

export default function Start() {
  return (
    <div>
      <div className="bg-cover bg-bottom bg-[url(https://images.unsplash.com/photo-1593950315186-76a92975b60c?q=80&w=4000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 w-full flex flex-col justify-between ">
        <img
          className="w-16 filter invert brightness-0 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1024px-Uber_logo_2018.svg.png"
          alt="Uber Logo"
        />
        <div className="py-5 px-5 ">
          <h2 className="text-2xl font-bold text-white">
            Get Started with Uber
          </h2>
          <Link
            to="/login"
            className="bg-white w-full py-3 mt-2 text-white rounded flex items-center relative"
          >
            <span className="absolute left-0 ml-4"></span>
            <span className="w-full text-center text-black font-bold">
              Continue
            </span>
            <EastIcon className="absolute right-4 w-5 h-5 text-black" />
          </Link>
        </div>
      </div>
    </div>
  );
}
