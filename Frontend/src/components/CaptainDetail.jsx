import { useContext } from "react";
import { CaptainDataContext } from "../Context/CaptainContext";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SpeedIcon from "@mui/icons-material/Speed";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";

export default function CaptainDetail() {
  const { captainData } = useContext(CaptainDataContext);
  // Debugging: Log the entire context value
  const contextValue = useContext(CaptainDataContext);
  console.log("Context Value:", contextValue);

  // Debugging: Log captainData
  console.log("Captain Data:", captainData);

  return (
    <div>
      <div className="h-[40%] p-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <img
              className="h-12 rounded-full"
              src="https://i.redd.it/so-is-mickey-mouse-and-oswalds-face-fur-or-skin-v0-rjz2dufaxw3a1.jpg?width=500&format=pjpg&auto=webp&s=35a7dbcb71de546c66c18d22906eb7a14cc725ce"
              alt=""
            />
            <div>
              <h4 className="font-semibold text-gray-700 capitalize">{captainData.fullName.firstName + " " + captainData.fullName.lastName}</h4>
              <p className="leading-tight text-xs font-semibold text-gray-500">
                Happy Driver
              </p>
            </div>
          </div>
          <div className="text-right">
            <h5 className="font-semibold">$296.40</h5>
            <p className="leading-tight font-semibold text-gray-500">Earned</p>
          </div>
        </div>
        <div className="flex items-center justify-between px-8 py-4 bg-yellow-300 mt-8 rounded-xl">
          <div className="text-center">
            <ScheduleIcon />
            <h4 className="text-lg font-medium mt-1">10.2 Hrs</h4>
            <p className="text-xs text-gray-600">Hours online</p>
          </div>
          <div className="text-center ml-3">
            <SpeedIcon />
            <h4 className="text-lg font-medium mt-1 ">30.6 Km</h4>
            <p className="text-xs text-gray-600">Total distance</p>
          </div>
          <div className="text-center">
            <NoteAltOutlinedIcon />
            <h4 className="text-lg font-medium mt-1">7</h4>
            <p className="text-xs text-gray-600">Notes logged</p>
          </div>
        </div>
      </div>
    </div>
  );
}
