import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "../components/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FinishRide from "../components/FinishRide";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CaptainRiding() {
  const [finishRidePanel, setFinishRidePanel] = useState(false);

  const finishRidePanelRef = useRef(null);

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [finishRidePanel]);

  return (
    <div className="h-screen">
      <img
        className="w-16 absolute top-5 left-5"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1024px-Uber_logo_2018.svg.png"
        alt="Uber Logo"
      />
      <Link
        to="/captain-home"
        className="fixed right-4 top-4 bg-white rounded-full p-2 flex items-center justify-center"
      >
        <LogoutIcon className="text-gray-700" />
      </Link>

      <div className="h-[80%]">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div
        className="h-[20%] bg-yellow-400 flex justify-between items-center p-6 relative"
      onClick={() => {setFinishRidePanel(true)}}
      >
        <h4 className="text-xl mt-6">4 Kms away</h4>
        <div className="w-auto">
          <Button
            label={"Complete Ride"}
            type={"button"}
            onClick={() => {}}
            className="bg-green-600 hover:bg-green-700 text-white px-6"
          />
        </div>
        <ExpandMoreIcon
          onClick={() => {}}
          className="absolute top-2 right-4 rotate-180 text-gray-600"
        />
      </div>
      <div>
        <FinishRide
          finishRidePanelRef={finishRidePanelRef}
          setFinishRidePanel={setFinishRidePanel}
        />
      </div>
    </div>
  );
}
