import React, { useState, useEffect } from 'react';
import { MapContainer, useMapEvent } from 'react-leaflet';
import L from 'leaflet';

import LandingLayer from './LandingLayer';
import ThrowingLayer from './ThrowingLayer';
import TilesLayer from './TilesLayer';
import FloorControl from './FloorControl';

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

function Map({ mapName, clickHandler, onChangeTarget }) {
  const [landingTarget, setLandingTarget] = useState(null);

  const initialMapValue = {
    name: mapName || 'de_dust2',
    floor: 0,
  };
  const [map, setMap] = useState(initialMapValue);
  if (map.name !== mapName) {
    setLandingTarget(null);
    setMap(initialMapValue);
  }

  const MapEvent = () => {
    useMapEvent('click', (event) => {
      if (clickHandler) clickHandler({ event, map });
    });
    return null;
  };

  useEffect(() => {
    if (onChangeTarget) onChangeTarget(landingTarget);
  }, [landingTarget, onChangeTarget]);

  return (
    <MapContainer id='map' {...mapConfig}>
      <FloorControl map={map} updateMap={setMap} />
      <MapEvent />
      <TilesLayer map={map} />
      <LandingLayer
        map={map}
        setTarget={setLandingTarget}
        target={landingTarget}
      />
      {landingTarget && <ThrowingLayer target={landingTarget} />}
    </MapContainer>
  );
}

export default Map;
