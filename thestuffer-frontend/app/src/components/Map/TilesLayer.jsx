import { useEffect, useRef, useState } from 'react';
import { TileLayer } from 'react-leaflet';
import L from 'leaflet';

const TilesLayer = ({ map }) => {
  useState(map);

  const tileLayer = useRef();
  useEffect(() => {
    L.setOptions(tileLayer.current, { floor: map.floor, map: map.name });
    tileLayer.current.redraw();
  });


  const testUrl =
    window.location.origin + '/images/maps/{map}_{floor}/{z}/{y}/{x}.png';

  const tileLayerConfig = {
    url: testUrl,
    map: map.name,
    floor: map.floor,
    minZoom: 0,
    maxZoom: 3,
    noWrap: true,
    ref: tileLayer,
  };

  return <TileLayer {...tileLayerConfig} />;
};

export default TilesLayer;
