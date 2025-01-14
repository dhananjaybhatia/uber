/* eslint-disable react/prop-types */
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function LocationSearchPanel({
  suggestions,
  setLocation,
  activeField,
}) {
  const handleClick = (suggestion) => {
    setLocation(suggestion.description, activeField); // Use `description` from the object
  };

  return (
    <div className=" mt-10">
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          onClick={() => handleClick(suggestion)}
          className="flex items-center border-2 rounded-2xl p-3 border-gray-200 active:border-black justify-start my-4 gap-2"
        >
          <h2 className="bg-[#eeeeee] rounded-full h-10 w-10 flex items-center justify-center">
            <LocationOnIcon />
          </h2>
          <h4 className="font-medium">{suggestion.description}</h4>
          {/* Render description */}
        </div>
      ))}
    </div>
  );
}
