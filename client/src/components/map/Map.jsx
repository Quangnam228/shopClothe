import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import "./map.css";
import Navbar from "../Navbar";

const containerStyle = {
  width: "100vw",
  height: "90vh",
};

const center = {
  lat: 21.0197586,
  lng: 105.7751326,
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_GOOGLE_MAP_API,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (!isLoaded) {
    return <div>errorMap</div>;
  }

  return (
    <div className="MapContainer">
      <Navbar />
      <div className="map">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker position={center} />
        </GoogleMap>
      </div>
      <div className="IconMap">
        <MyLocationIcon
          onClick={() => {
            map.panTo(center);
            map.setZoom(15);
          }}
        />
      </div>
    </div>
  );
}

export default React.memo(Map);
