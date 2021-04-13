import React, { useState } from 'react';
import { MapContainer } from 'react-leaflet';
import L from 'leaflet';

import LandingLayer from './LandingLayer';
import ThrowingLayer from './ThrowingLayer';
import TilesLayer from './TilesLayer';

import './Map.css';

const corner1 = L.latLng(180, -180);
const corner2 = L.latLng(-180, 180);
const limitBounds = L.latLngBounds(corner1, corner2);
const mapConfig = {
  center: [0, 0],
  zoom: 1,
  maxBounds: limitBounds,
  maxBoundsViscosity: 0.5,
  inertia: false,
  scrollWheelZoom: true,
};

function Map({ mapName }) {
  const [landingTarget, setLandingTarget] = useState(null);

  return (
    <MapContainer id='map' {...mapConfig}>
      <TilesLayer mapName={mapName} />
      <LandingLayer
        mapName={mapName}
        setTarget={setLandingTarget}
        target={landingTarget}
      />
      {landingTarget && <ThrowingLayer target={landingTarget} />}
    </MapContainer>
  );
}

export default Map;