import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

import { throw_data } from './data';

const throwingLayer = L.layerGroup();

const getThrowingData = (landingId) => {
  return throw_data.filter((data) => data.hit_id === landingId);
};

const ThrowingLayer = ({ target }) => {
  // if no add the throwing layer on the map
  const map = useMap();
  if (!map.hasLayer(throwingLayer)) map.addLayer(throwingLayer);

  // on destroy props clear heatmap
  useEffect(() => () => throwingLayer.clearLayers());

  // load data
  const throwingData = getThrowingData(target);

  // parse data
  const data = throwingData.map((d) => [d.lat, d.lng, 1]);

  // create heatmap
  let heatmap = L.heatLayer(data, { radius: 25 });

  // add heatmap on the map
  throwingLayer.addLayer(heatmap);

  return null;
};

export default ThrowingLayer;
