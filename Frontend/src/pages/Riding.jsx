import Button from "../components/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarRateIcon from "@mui/icons-material/StarRate";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import { Link } from "react-router-dom";

export default function Riding() {
  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed right-4 top-4 bg-white rounded-full p-2 flex items-center justify-center"
      >
        <OtherHousesOutlinedIcon className="text-gray-700" />
      </Link>

      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex justify-between items-center">
          <img
            className="h-24 -ml-4"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646935/assets/64/93c255-87c8-4e2e-9429-cf709bf1b838/original/3.png"
            alt=""
          />

          <div className="text-right">
            <h2 className="text-lg font-medium">Micky Mouse</h2>
            <h4 className="text-3xl font-semibold -mt-1 -mb-1">MP-123-LA</h4>
            <p className="font-semibold text-gray-600">Honda City</p>
            <p className="flex items-center justify-end gap-1">
              <StarRateIcon fontSize="small" className="text-gray-500" />
              <span className="text-sm font-medium leading-none">4.9</span>
            </p>
          </div>
        </div>
        <div className="w-full ">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <LocationOnIcon className="text-gray-500" />
            <div className="">
              <h3 className="text-xl font-semibold">95/10 Stanford Road</h3>
              <p className="font-semibold text-gray-600">Hawthorn, Vic-3123</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 -mb-4">
            <AttachMoneyIcon className="text-gray-500 scale-110" />
            <div className="">
              <h3 className="text-xl font-semibold">$16.53</h3>
              <p className="font-semibold text-gray-600">
                Online payment only.
              </p>
            </div>
          </div>
        </div>

        <Button label={"Make a Payment"} className="mb-2 bg-green-600" />
      </div>
    </div>
  );
}
