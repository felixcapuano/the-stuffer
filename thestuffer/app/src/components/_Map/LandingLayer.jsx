import React from 'react';
import { LayerGroup, Marker } from 'react-leaflet';

import { land_data } from './data';

const getLandingData = (mapName, id = null) => {
  if (id) {
    return land_data.filter((data) => data.map === mapName && data.id === id);
  }
  return land_data.filter((data) => data.map === mapName);
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
      ></Marker>
    );
  });
  return <LayerGroup>{landingMarkers}</LayerGroup>;
};

export default LandingLayer;
