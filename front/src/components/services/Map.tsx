import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MapProps {
  apiKey: string;
  center: { lat: number; lng: number };
  zoom: number;
  markers: { lat: number; lng: number; name: string }[];
}

const Map: React.FC<MapProps> = ({ apiKey, center, zoom, markers }) => {
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={{ height: "400px", width: "100%",borderRadius:"10px" }}
        center={center}
        zoom={zoom}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            label={marker.name} 
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
