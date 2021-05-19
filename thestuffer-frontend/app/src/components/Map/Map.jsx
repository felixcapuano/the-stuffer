import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, useMapEvent } from 'react-leaflet';
import L from 'leaflet';

import LandingLayer from './LandingLayer';
import ThrowingLayer from './ThrowingLayer';
import TilesLayer from './TilesLayer';
import FloorControl from './FloorControl';

import './Map.css';
const defaultMapStyle = { backgroundColor: 'black', height: '100px', wight: '100px'};

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

function Map({
  mapStyle,
  mapName,
  clickHandler,
  onChangeTarget,
  disabledThrowing,
  targetId,
  throwError,
}) {
  console.log('Map render');

  const [landingTarget, setLandingTarget] = useState(targetId);
  if (!throwError) {
    throwError = (e) => {
      console.error(e);
    };
  }

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
    const [mouseTarget, setMouseTarget] = useState(undefined);

    useMapEvent('click', (event) => {
      if (!event) return;
      setMouseTarget(
        <Marker
          position={event.latlng}
          eventHandlers={{ click: () => setMouseTarget(undefined) }}
        />
      );
      if (clickHandler) {
        clickHandler({
          event,
          map,
          landingMode: !landingTarget ? true : false,
          throwingMode: landingTarget ? true : false,
        });
      }
    });
    return <div>{mouseTarget}</div>;
  };

  useEffect(() => {
    if (onChangeTarget) onChangeTarget(landingTarget);
  }, [landingTarget, onChangeTarget]);

  return (
    <MapContainer id='map' {...mapConfig} style={mapStyle || defaultMapStyle}>
      <FloorControl map={map} updateMap={setMap} />
      <MapEvent />
      <TilesLayer map={map} />
      <LandingLayer
        map={map}
        setTarget={setLandingTarget}
        target={landingTarget}
        disabledMarker={disabledThrowing}
        throwError={throwError}
      />
      {!disabledThrowing && landingTarget && (
        <ThrowingLayer target={landingTarget} />
      )}
    </MapContainer>
  );
}

export default Map;
