import L, { tileLayer } from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import { LayersControl, useMap, TileLayer } from 'react-leaflet';

const tilesLayerGroup = L.layerGroup();

const TilesLayer = ({ mapName }) => {
  // const map = useMap();
  // if (!map.hasLayer(tilesLayerGroup)) map.addLayer(tilesLayerGroup);

  // const newTilesLayer = L.tileLayer();
  useState(mapName);

  const tileLayer = useRef();
  const tilesUrl = (m) =>
    window.location.origin + '/images/maps/' + m + '/{z}/{y}/{x}.png';

  // tilesLayerGroup.clearLayers();
  // tilesLayerGroup.addLayer(newTilesLayer);
  useEffect(() => {
    tileLayer.current.setUrl(tilesUrl(mapName), false);
  });

  //console.log(url('de_inferno'));
  const tileLayerConfig = {
    url: tilesUrl(mapName),
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
