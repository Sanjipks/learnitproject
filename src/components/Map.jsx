import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

const GMap = () => {
  return (
    // <APIProvider apiKey={"API_KEY"}>
    <APIProvider>
      <Map
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        defaultZoom={3}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      />
    </APIProvider>
  );
};

export default GMap;
