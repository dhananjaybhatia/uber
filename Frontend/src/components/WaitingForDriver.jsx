/* eslint-disable react/prop-types */
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarRateIcon from "@mui/icons-material/StarRate";

export default function WaitingForDriver({
  waitingForDriverRef,
  waitingForDrivierPanel,
  setWaitingForDrivierPanel,
}) {
  return (
    <div
      ref={waitingForDriverRef}
      className="fixed z-10 w-full translate-y-full bg-white  p-3 py-6 bottom-0"
    >
      <ExpandMoreIcon
        onClick={() => setWaitingForDrivierPanel(false)} // Close the panel
        className="absolute top-2 right-2 text-gray-600"
      />
      <div className=" ">
        <div className="flex justify-between items-center">
          <img
            className="h-24 rounded-full absolute"
            src="https://cdn.pixabay.com/photo/2022/05/30/04/50/mickey-mouse-7230486_1280.png"
            alt=""
          />
          <img
            className="h-16 object-cover "
            src="https://e7.pngegg.com/pngimages/735/355/png-clipart-honda-city-car-vtec-honda-fit-honda-compact-car-sedan.png"
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
      </div>{" "}
    </div>
  );
}
