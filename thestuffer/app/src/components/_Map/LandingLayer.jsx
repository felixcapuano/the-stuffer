import React, { useContext } from 'react';
import { LayerGroup, Marker } from 'react-leaflet';

import StuffDataContext from '../../context/StuffDataContext';

const LandingLayer = ({ setTarget, target }) => {
  const { getLandingData } = useContext(StuffDataContext);

  const landingData = getLandingData('de_mirage', target);

  const handlerMarker = {
    click: (e) => {
      const throwingId = e.target.options.dataId;
      setTarget(target ? null : throwingId);
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
