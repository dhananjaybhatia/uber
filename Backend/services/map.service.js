import axios from "axios";

export const getAddressCoordinate = async (address) => {
  const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error(
      "GOOGLE_MAPS_API_KEY is not defined in environment variables."
    );
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await axios.get(url);
    const { status, results } = response.data;

    if (status === "OK" && results.length > 0) {
      const location = results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      throw new Error(`Geocoding failed: ${status}`);
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message || error);
    throw new Error("Failed to fetch coordinates. Please try again.");
  }
};

export const getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error("GOOGLE_MAPS_API_KEY is not defined in environment variables.");
  }

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(
    destination
  )}&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await axios.get(url);

    if (response.data.status === "OK") {
      const element = response.data?.rows?.[0]?.elements?.[0];

      if (!element || element.status !== "OK") {
        throw new Error("No valid route found");
      }

      return {
        distance: element.distance.value / 1000, // km
        time: element.duration.value / 60, // mins
      };
    } else {
      throw new Error(`API Error: ${response.data.status}`);
    }
  } catch (error) {
    console.error("Error in getDistanceTime:", error.message || error);
    throw new Error("Unable to fetch distance and time. Please try again.");
  }
};


export const getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("query is required");
  }
  const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions;
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
