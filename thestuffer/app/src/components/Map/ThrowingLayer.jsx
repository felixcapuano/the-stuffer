import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

import { stuffInstance } from '../../axios';

const throwingLayer = L.layerGroup();

const ThrowingLayer = ({ target }) => {
  // if no add the throwing layer on the map
  const map = useMap();
  if (!map.hasLayer(throwingLayer)) map.addLayer(throwingLayer);

  const [{ hits, isLoading, error }, setData] = useState({
    hits: [],
    isLoading: true,
    error: null,
  });

  // on destroy props clear heatmap
  useEffect(() => {
    const payload = { collection: 'throwing', landing_id: target };
    stuffInstance
      .post('/stuff/search', payload)
      .then((res) => {
        if (!res.data.ok) throw new Error(res.data.message);
        setData({ isLoading: false, hits: res.data.hits });
      })
      .catch((error) => setData({ isLoading: false, error }));
    return () => throwingLayer.clearLayers();
  }, [setData, target]);

  if (isLoading) return 'Loading...';
  if (error) return 'Error';

  // parse data
  const data = hits.map((d) => [d.position.lat, d.position.lng, 1]);

  // create heatmap
  const heatmap = L.heatLayer(data, { radius: 10 });

  // add heatmap on the map
  throwingLayer.addLayer(heatmap);

  return null;
};

export default ThrowingLayer;
