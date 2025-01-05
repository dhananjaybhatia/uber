/* eslint-disable react/prop-types */
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function LocationSearchPanel({
  setVehicePanelOpen,
  setOpenPanel,
}) {
  const locations = Array.from(
    { length: 5 },
    () => `${Math.floor(Math.random() * 1000)} Main St, Anytown, USA`
  );

  return (
    <div>
      {locations.map((location, index) => (
        <div
          onClick={() => {
            setVehicePanelOpen(true);
            setOpenPanel(false);
          }}
          key={index}
          className="flex items-center border-2 rounded-2xl p-3 border-gray-200 active:border-black justify-start my-4 gap-2"
        >
          <h2 className="bg-[#eeeeee] rounded-full h-10 w-10 flex items-center justify-center">
            <LocationOnIcon />
          </h2>
          <h4 className="font-medium">{location}</h4>
        </div>
      ))}
    </div>
  );
}
