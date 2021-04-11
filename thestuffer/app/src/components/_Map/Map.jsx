import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer } from 'react-leaflet';
import L from 'leaflet';

import LandingLayer from './LandingLayer';
import ThrowingLayer from './ThrowingLayer';

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

function Map() {
  const params = useParams();

  const [landingTarget, setLandingTarget] = useState(null);

  const [tileGroupLayer] = useState(L.layerGroup);
  const handlerCreate = (map) => map.addLayer(tileGroupLayer);

  const TileLayer = ({ mapName, tileLayer }) => {
    tileLayer.clearLayers();

    const url = window.location.origin + '/images/maps/{map}/{z}/{y}/{x}.png';
    const newTileLayer = L.tileLayer(url, {
      map: mapName,
      minZoom: 0,
      maxZoom: 3,
      noWrap: true,
    });
    tileLayer.addLayer(newTileLayer);

    return null;
  };

  return (
    <MapContainer id='map' {...mapConfig} whenCreated={handlerCreate}>
      <TileLayer mapName={params.map} tileLayer={tileGroupLayer} />
      <LandingLayer setTarget={setLandingTarget} target={landingTarget} />
      {landingTarget && <ThrowingLayer target={landingTarget} />}
    </MapContainer>
  );
}

export default Map;
