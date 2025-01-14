import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { debounce } from "lodash";

import axios from "axios";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationSearchPanel from "../components/LocationSearchPanel";
import SelectRide from "../components/SelectRide";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import Button from "../components/Button";

export default function Home() {
  const [addPickup, setAddPickup] = useState("");
  const [addDestination, setAddDestination] = useState("");
  const [vehicleType, setVehicleType] = useState(null);
  const [vehicePanelOpen, setVehicePanelOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFoundPanel, setVehicleFoundPanel] = useState(false);
  const [waitingForDrivierPanel, setWaitingForDrivierPanel] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [fare, setFare] = useState({});

  const panelRef = useRef(null);
  const vehicePanelRef = useRef(null);
  const closePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

  const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  const UpdateLocation = (value, field) => {
    console.log("Updating field:", field, "with value:", value);
    if (field === "pickup") {
      setAddPickup(value); // Update pickup field
    } else if (field === "destination") {
      setAddDestination(value); // Update destination field
    }
    setActiveField(null); // Close suggestions panel
  };

  const fetchSuggestions = debounce(async (value, field) => {
    setLoadingSuggestions(true);
    try {
      const response = await axios.get(
        `${VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: value },
          headers: getHeaders(),
        }
      );

      if (field === "pickup") {
        setPickupSuggestions(response.data);
      } else {
        setDestinationSuggestions(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSuggestions(false);
    }
  }, 300);

  const handleInputChange = (e, field) => {
    const value = e.target.value;

    if (field === "pickup") {
      setAddPickup(value);
      setActiveField("pickup");
    } else if (field === "destination") {
      setAddDestination(value);
      setActiveField("destination");
    }

    fetchSuggestions(value, field);
  };

  async function findTrip() {
    try {
      setVehicePanelOpen(true);
      setOpenPanel(false);

      // Ensure addPickup and addDestination are used correctly
      const response = await axios.get(`${VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup: addPickup, destination: addDestination }, // Using state variables
        headers: getHeaders(),
      });

      console.log("Fare response:", response.data); // Proper logging
      setFare(response.data);
    } catch (error) {
      console.error(
        "Error fetching fare:",
        error.response?.data || error.message
      );
    }
  }

  async function createYourRide() {
    const response = await axios.post(
      `${VITE_BASE_URL}/rides/create`,
      {
        pickup: addPickup, // Use "pickup" instead of "addPickup"
        destination: addDestination, // Use "destination" instead of "addDestination",
        vehicleType,
      },
      {
        headers: getHeaders(),
      }
    );
    console.log(response.data);
  }

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
        opacity: 1,
        visibility: "visible",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)",
        opacity: 0,
        visibility: "hidden",
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vehicleFoundPanel) {
      gsap.to(vehicleFoundRef.current, {
        translateY: "0%",
        opacity: 1,
        visibility: "visible",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        translateY: "100%",
        opacity: 0,
        visibility: "hidden",
      });
    }
  }, [vehicleFoundPanel]);

  useGSAP(() => {
    if (waitingForDrivierPanel) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0%)",
        opacity: 1,
        visibility: "hidden",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
        opacity: 0,
        visibility: "hidden",
        
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
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="line absolute h-16 w-1 top-[47%] left-10 bg-gray-600 rounded-full"></div>
            <InputBox
              value={addPickup}
              onClick={() => {
                setOpenPanel(true);
                setActiveField("pickup");
              }}
              className="bg-[#eeeeee] font-medium px-8"
              onChange={(e) => handleInputChange(e, "pickup")}
              type="text"
              placeholder={"Add a pick-up location"}
            />
            <InputBox
              onClick={() => {
                setOpenPanel(true);
                setActiveField("destination");
              }}
              value={addDestination}
              className="bg-[#eeeeee] font-medium px-8"
              onChange={(e) => handleInputChange(e, "destination")}
              type="text"
              placeholder={"Add your destination"}
            />
          </form>
          <div>
            <Button
              onClick={findTrip}
              type={"button"}
              className=""
              label={"Find Trip"}
            />
          </div>
        </div>
        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            activeField={activeField}
            setLocation={UpdateLocation}
          />
        </div>
      </div>
      <div>
        <SelectRide
          vehicePanelRef={vehicePanelRef}
          setVehicePanelOpen={setVehicePanelOpen}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          selectVehicle={setVehicleType}
        />
      </div>
      <div>
        <ConfirmRide
          addPickup={addPickup}
          fare={fare}
          vehicleType={vehicleType}
          addDestination={addDestination}
          createYourRide={createYourRide}
          confirmRidePanelRef={confirmRidePanelRef}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFoundPanel={setVehicleFoundPanel}
        />
      </div>
      <div>
        <LookingForDriver
          addPickup={addPickup}
          fare={fare}
          vehicleType={vehicleType}
          addDestination={addDestination}
          createYourRide={createYourRide}
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
