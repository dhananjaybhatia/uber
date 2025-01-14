/* eslint-disable react/prop-types */
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Heading from "./Heading";

export default function SelectRide({
  vehicePanelRef,
  setVehicePanelOpen,
  setConfirmRidePanel,
  selectVehicle,
  fare,
}) {
  return (
    <div
      ref={vehicePanelRef}
      className="fixed z-10 w-full translate-y-full bg-white p-3 py-6 bottom-0"
    >
      <ExpandMoreIcon
        onClick={() => setVehicePanelOpen(false)} // Close the panel
        className="absolute top-2 right-2 text-gray-600"
      />
      <Heading label={"Choose your ride"} className="font-semibold ml-4 mb-4" />
      <div
        onClick={() => {
          setConfirmRidePanel(true);
          selectVehicle("car");
        }}
        className="flex w-full p-2 border-2 mb-2 active:border-black border-gray-50 rounded-2xl items-center justify-between"
      >
        <img
          className="h-16"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646935/assets/64/93c255-87c8-4e2e-9429-cf709bf1b838/original/3.png"
        />
        <div className="w-1/2">
          <h4 className="font-medium text-md flex  items-center space-x-1">
            <span>UberGo</span>
            <span className="flex items-center">
              <PersonIcon fontSize="small" />
              <span className="text-sm leading-none">4</span>
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, compact ride
          </p>
        </div>
        <h2 className="text-xl font-semibold">${fare.car}</h2>
      </div>
      <div
        onClick={() => {
          setConfirmRidePanel(true);
          selectVehicle("moto");
        }}
        className="flex w-full p-2 border-2 mb-2 active:border-black border-gray-50 rounded-2xl items-center justify-between"
      >
        <img
          className="h-16 "
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
        />
        <div className="w-1/2">
          <h4 className="font-medium text-md flex  items-center space-x-1">
            <span>Moto</span>
            <span className="flex items-center">
              <PersonIcon fontSize="small" />
              <span className="text-sm leading-none">1</span>
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, motorcycle ride
          </p>
        </div>
        <h2 className="text-xl font-semibold">${fare.moto}</h2>
      </div>
      <div
        onClick={() => {
          setConfirmRidePanel(true);
          selectVehicle("auto");
        }}
        className="flex w-full p-2 border-2 mb-2 active:border-black border-gray-50 rounded-2xl items-center justify-between"
      >
        <img
          className="h-16 "
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
        />
        <div className="w-1/2">
          <h4 className="font-medium text-md flex  items-center space-x-1">
            <span>Auto</span>
            <span className="flex items-center">
              <PersonIcon fontSize="small" />
              <span className="text-sm leading-none">4</span>
            </span>
          </h4>
          <h5 className="font-medium text-sm">10 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, tuk-tuk ride
          </p>
        </div>
        <h2 className="text-xl font-semibold">${fare.auto}</h2>
      </div>
    </div>
  );
}
