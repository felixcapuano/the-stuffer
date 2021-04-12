import React, { useContext } from 'react';
import { useMap } from 'react-leaflet';

import StuffDataContext from '../../context/StuffDataContext';

import L from 'leaflet';
import 'leaflet.heat';

const ThrowingLayer = ({ target }) => {
  const { getThrowingData } = useContext(StuffDataContext);

  const throwingData = getThrowingData(target);
  const data = throwingData.map((d) => [d.lat, d.lng, 100]);

  let heatmap = L.heatLayer(data, { radius: 25 });

  const map = useMap();
  map.addLayer(heatmap);

  return null;
};

export default ThrowingLayer;
