import { useContext, useEffect } from 'react';
import { useMap } from 'react-leaflet';

import StuffDataContext from '../../context/StuffDataContext';

import L from 'leaflet';
import 'leaflet.heat';

const throwingLayer = L.layerGroup();

const ThrowingLayer = ({ target }) => {
  const { getThrowingData } = useContext(StuffDataContext);

  const throwingData = getThrowingData(target);
  const data = throwingData.map((d) => [d.lat, d.lng, 1]);

  let heatmap = L.heatLayer(data, { radius: 25 });

  const map = useMap();
  if (!map.hasLayer(throwingLayer)) map.addLayer(throwingLayer);

  throwingLayer.addLayer(heatmap);

  useEffect(() => () => throwingLayer.clearLayers());

  return null;
};

export default ThrowingLayer;
