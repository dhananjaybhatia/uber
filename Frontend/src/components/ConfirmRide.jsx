/* eslint-disable react/prop-types */
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Button from "./Button";

import Heading from "./Heading";

export default function ConfirmRide({
  confirmRidePanelRef,
  setConfirmRidePanel,
  setVehicleFoundPanel,
  createYourRide,
  vehicleType,
  addPickup,
  addDestination,
  fare,

}) {

  return (
    <div
      ref={confirmRidePanelRef}
      className="fixed z-10 w-full translate-y-full bg-white  p-3 py-4 bottom-0"
    >
      <ExpandMoreIcon
        onClick={() => setConfirmRidePanel(false)} // Close the panel
        className="absolute top-2 right-2 text-gray-600"
      />
      <Heading
        className="font-semibold ml-4 mb-4"
        label={"Confirm your ride"}
      />
      <div className="flex flex-col gap-3 justify-between items-center  ">
        <div>
          <img
            className="w-full object-cover"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646935/assets/64/93c255-87c8-4e2e-9429-cf709bf1b838/original/3.png"
          />
        </div>
        <div className="w-full ">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <MyLocationIcon className="text-gray-500" />
            <div className="">
              <h3 className="text-xl font-semibold">10/5 Holly Street</h3>
              <p className="font-semibold text-gray-600">{addPickup}</p>
            </div>
          </div>
          <div>
            {" "}
            <div className="flex items-center gap-5 p-3 border-b-2">
              <LocationOnIcon className="text-gray-500" />
              <div className="">
                <h3 className="text-xl font-semibold">95/10 Stanford Road</h3>
                <p className="font-semibold text-gray-600">{addDestination}</p>
              </div>
            </div>
          </div>
          <div>
            {" "}
            <div className="flex items-center gap-5 p-3 ">
              <AttachMoneyIcon className="text-gray-500 scale-110" />
              <div className="">
                <h3 className="text-xl font-semibold">${fare[vehicleType]}</h3>
                <p className="font-semibold text-gray-600">
                  Online payment only.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Button className="bg-green-700 hover:bg-green-800 text-white"
          label={"Confirm"}
          onClick={() => {
            setVehicleFoundPanel(true);
            setConfirmRidePanel(false);
            createYourRide();
          }}
          
        />
      </div>{" "}
    </div>
  );
}
