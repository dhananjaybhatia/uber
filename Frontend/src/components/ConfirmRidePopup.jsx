/* eslint-disable react/prop-types */
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Button from "./Button";

import Heading from "./Heading";

export default function ConfirmRidePopup({
    confirmRidePopupRef,
    setConfirmRidePopupPanel,
    setRidePopupPanel
}) {
  return (
    <div
      ref={confirmRidePopupRef}
      className="fixed z-10 w-full bg-white h-screen translate-y-full p-3 py-6 bottom-0"
    >
      <ExpandMoreIcon
        onClick={() => {
            setConfirmRidePopupPanel(false);
        }}
        className="absolute top-2 right-2 text-gray-600"
      />
      <Heading
        className="font-semibold text-center mb-4"
        label={"Confirm Ride"}
      />
      <div className="flex flex-col gap-3 justify-between items-center p-3 ">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3  px-2">
              <img
                className="h-16 object-cover"
                src="https://comicvine.gamespot.com/a/uploads/scale_small/11/114183/6665931-bart.png"
              />
              <h2 className="font-medium text-lg">Simson Musk</h2>
            </div>
            <h5 className="font-semibold text-lg text-gray-800">2.2 Km</h5>
          </div>
        </div>

        <div className="w-full ">
          <div className="flex items-center gap-5 p-2  border-b-2">
            <MyLocationIcon className="text-gray-500" />
            <div className="">
              <h3 className="text-xl font-semibold">10/5 Holly Street</h3>
              <p className="font-semibold text-gray-600">
                Camberwell, Vic-3124
              </p>
            </div>
          </div>
          <div>
            {" "}
            <div className="flex items-center gap-5 p-3 border-b-2">
              <LocationOnIcon className="text-gray-500" />
              <div className="">
                <h3 className="text-xl font-semibold">95/10 Stanford Road</h3>
                <p className="font-semibold text-gray-600">
                  Hawthorn, Vic-3123
                </p>
              </div>
            </div>
          </div>
          <div>
            {" "}
            <div className="flex items-center gap-5 p-3 ">
              <AttachMoneyIcon className="text-gray-500 scale-110" />
              <div className="">
                <h3 className="text-xl font-semibold">$16.53</h3>
                <p className="font-semibold text-gray-600">
                  Online payment only.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Button
          label={"Confirm"}
          onClick={() => {}}
          className="bg-green-600 hover:bg-green-700 text-white -mb-4"
        />
        <Button
          label={"Cancel"}
          onClick={() => {
            setConfirmRidePopupPanel(false)
            setRidePopupPanel(false)
          }}
          type={"button"}
          className="bg-red-600 hover:bg-gray-500"
        />
      </div>{" "}
    </div>
  );
}
