import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import './Map.css';

const Map = ({ mapName }) => {
  return (
    <div>
      map {mapName}
      <MapContainer
        id='map'
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer url='logo512.png' />
      </MapContainer>
    </div>
  );
};
// 'images/maps/{map}/{z}/{y}/{x}.png'

export default Map;
