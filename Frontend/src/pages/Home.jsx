import { useRef, useState } from "react";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationSearchPanel from "../components/LocationSearchPanel";
import SelectRide from "../components/SelectRide";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

export default function Home() {
  const [addPickup, setAddPickup] = useState("");
  const [addDestination, setAddDestination] = useState("");
  const [vehicePanelOpen, setVehicePanelOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFoundPanel, setVehicleFoundPanel] = useState(false);
  const [waitingForDrivierPanel, setWaitingForDrivierPanel] = useState(false);

  const panelRef = useRef(null);
  const vehicePanelRef = useRef(null);
  const closePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  useGSAP(() => {
    if (openPanel) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 25,
      });
      gsap.to(closePanelRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: 0,
      });
      gsap.to(closePanelRef.current, {
        opacity: 0,
        rotate: 0,
      });
    }
  }, [openPanel]);

  useGSAP(() => {
    if (vehicePanelOpen) {
      gsap.to(vehicePanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(vehicePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicePanelOpen]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vehicleFoundPanel) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicleFoundPanel]);

  useGSAP(() => {
    if (waitingForDrivierPanel) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDrivierPanel]);

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute top-5 left-5"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1024px-Uber_logo_2018.svg.png"
        alt="Uber Logo"
      />
      <div className="h-screen w-screen ">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] bg-white p-6 relative">
          <ExpandMoreIcon
            ref={closePanelRef}
            className="absolute opacity-0 top-2 right-2 text-gray-600"
            onClick={() => setOpenPanel(false)}
          />
          <Heading label={"Find a trip"} className="font-semibold" />
          <form onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[47%] left-10 bg-gray-600 rounded-full"></div>
            <InputBox
              value={addPickup}
              onClick={() => setOpenPanel(true)}
              className="bg-[#eeeeee] font-medium px-8"
              onChange={(e) => setAddPickup(e.target.value)}
              type="text"
              placeholder={"Add a pick-up location"}
            />
            <InputBox
              onClick={() => setOpenPanel(true)}
              value={addDestination}
              className="bg-[#eeeeee] font-medium px-8"
              onChange={(e) => setAddDestination(e.target.value)}
              type="text"
              placeholder={"Add your destination"}
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel
            setOpenPanel={setOpenPanel}
            setVehicePanelOpen={setVehicePanelOpen}
          />
        </div>
      </div>
      <div>
        <SelectRide
          vehicePanelRef={vehicePanelRef}
          setVehicePanelOpen={setVehicePanelOpen}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>
      <div>
        <ConfirmRide
          confirmRidePanelRef={confirmRidePanelRef}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFoundPanel={setVehicleFoundPanel}
        />
      </div>
      <div>
        <LookingForDriver
          vehicleFoundRef={vehicleFoundRef}
          setVehicleFoundPanel={setVehicleFoundPanel}
        />
      </div>
      <div>
        <WaitingForDriver
          waitingForDriverRef={waitingForDriverRef}
          waitingForDrivierPanel={waitingForDrivierPanel}
          setWaitingForDrivierPanel={setWaitingForDrivierPanel}
        />
      </div>
    </div>
  );
}
