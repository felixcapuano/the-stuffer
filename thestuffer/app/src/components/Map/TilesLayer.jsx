import L from 'leaflet';
import { LayersControl, useMap } from 'react-leaflet';

const tilesLayerGroup = L.layerGroup();
const url = window.location.origin + '/images/maps/{map}/{z}/{y}/{x}.png';

const TilesLayer = ({ mapName }) => {
  const map = useMap();
  if (!map.hasLayer(tilesLayerGroup)) map.addLayer(tilesLayerGroup);

  const newTilesLayer = L.tileLayer(url, {
    map: mapName,
    minZoom: 0,
    maxZoom: 3,
    noWrap: true,
  });

  tilesLayerGroup.clearLayers();
  tilesLayerGroup.addLayer(newTilesLayer);

  // TODO watch for react leaflet Tile Layer to replace with useRef
  return (
    <LayersControl position='topleft' collapsed={false}>
      <LayersControl.BaseLayer name={'1'}></LayersControl.BaseLayer>
    </LayersControl>
  );
};

export default TilesLayer;
