import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

interface MapProps {
  apiKey: string;
  center: google.maps.LatLngLiteral;
  zoom: number;
}

const Map: React.FC<MapProps> = ({ apiKey, center, zoom }) => {
  const mapContainerStyle = {
    height: '400px',
    width: '100%',
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
      >
        {/* Puedes agregar marcadores u otros componentes aquí */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
