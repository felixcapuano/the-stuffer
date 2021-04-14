import { useEffect, useRef, useState } from 'react';
import { LayersControl, TileLayer } from 'react-leaflet';

const floors = {
  de_mirage: 1,
  de_dust2: 1,
  de_inferno: 1,
  de_nuke: 2,
  de_vertigo: 2,
  de_overpass: 1,
  de_train: 1,
};

const TilesLayer = ({ mapName, setFloor }) => {
  const tileLayer = useRef();
  useEffect(() => {
    tileLayer.current.setUrl(_url(mapName), false);
  });

  useState(mapName);

  const _url = (m) =>
    window.location.origin + '/images/maps/' + m + '/{z}/{y}/{x}.png';


  const tileLayerConfig = {
    url: _url(mapName),
    minZoom: 0,
    maxZoom: 3,
    noWrap: true,
    ref: tileLayer,
  };

  // TODO watch for react leaflet Tile Layer to replace with useRef
  return (
    <LayersControl position='topleft' collapsed={false}>
      <LayersControl.BaseLayer checked name='0'>
        <TileLayer {...tileLayerConfig} />
      </LayersControl.BaseLayer>
    </LayersControl>
  );
};

export default TilesLayer;
