import React from 'react';
import { LayerGroup, Marker } from 'react-leaflet';
import L from 'leaflet';

import { land_data } from './data';

// ############ MARKERS ############
const _urlOrigin = window.location.origin;
const ICON_SIZE = 30;
const createIcon = (path) =>
  L.icon({
    iconUrl: _urlOrigin + '/' + path,
    iconSize: [ICON_SIZE, ICON_SIZE], // size of the icon
    iconAnchor: [ICON_SIZE / 2, ICON_SIZE / 2], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
  });
const icons = {
  smoke: createIcon('images/icons/smoke.png'),
  flash: createIcon('images/icons/flash.png'),
  molotov: createIcon('images/icons/molotov.png'),
};

const getLandingData = (mapName, id = null) => {
  if (!id) {
    return land_data.filter((data) => data.map === mapName);
  }
  return land_data.filter((data) => data.map === mapName && data.id === id);
};

const LandingLayer = ({ setTarget, target }) => {
  const landingData = getLandingData('de_mirage', target);

  const handlerMarker = {
    click: (e) => {
      const landingId = e.target.options.dataId;
      setTarget(target ? null : landingId);
    },
  };

  const landingMarkers = landingData.map((data) => {
    return (
      <Marker
        dataId={data.id}
        key={data.id}
        position={[data.lat, data.lng]}
        eventHandlers={handlerMarker}
        icon={icons[data.type]}
      ></Marker>
    );
  });
  return <LayerGroup>{landingMarkers}</LayerGroup>;
};

export default LandingLayer;
