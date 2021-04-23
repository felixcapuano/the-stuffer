import React, { useEffect, useRef } from 'react';

import L from 'leaflet';
import HeatmapOverlay from 'leaflet-heatmap';

import './Map.css';
import {
  MAP_CONFIG,
  HEATMAP_CONFIG,
  createTilesLayer,
  createIcon,
} from './MapConfig';

const SELECTION_SIZE = 20;
const HEATMAP_MAX = 3;

// map configuration
function Map(props) {
  const mapName = props.mapName;
  const setSelectedData = props.setSelectedData;

  const heatmapData = props.selectionModeData;
  const markerData = props.normalModeData;

  const heatmapLayer = new HeatmapOverlay(HEATMAP_CONFIG);

  const normalMode = useRef();
  const targetMrk = useRef();

  const mainLayer = useRef(L.layerGroup());

  useEffect(() => {
    console.log('use effect in');
    const map = L.map('map-container', MAP_CONFIG);

    map.addLayer(createTilesLayer(mapName));
    map.addLayer(mainLayer.current);

    map.on('click', mapClickHandler);

    return () => map.remove();
  });

  const markerClickHandler = (e) => {
    targetMrk.current = e.target;
    updateLayer();
  };

  const createMarker = (mrk) => {
    return L.marker([mrk.lat, mrk.lng], {
      icon: createIcon(mrk.type),
      title: mrk.id,
    }).on('click', markerClickHandler);
  };

  const updateHeatmap = (targetMrk) => {
    const mrkId = Number(targetMrk.options.title);

    // filtering data by id to keep only relevent one
    const stuffSelection = heatmapData.filter((d) => d.hit_id === mrkId);

    // set data of the heatmap layer
    heatmapLayer.setData({ max: HEATMAP_MAX, data: stuffSelection });
  };

  const markers = markerData.map((m) => createMarker(m));

  const setNormalMode = () => {
    mainLayer.current.clearLayers();

    markers.forEach((m) => mainLayer.current.addLayer(m));

    normalMode.current = true;
    console.log('normal mode : ' + normalMode.current);
  };

  const setSelectionMode = () => {
    if (targetMrk.current) {
      mainLayer.current.clearLayers();

      updateHeatmap(targetMrk.current);

      mainLayer.current.addLayer(heatmapLayer);
      mainLayer.current.addLayer(targetMrk.current);

      normalMode.current = false;
      console.log('normal mode : ' + normalMode.current);
    } else {
      setNormalMode();
    }
  };

  const mapClickHandler = (e) => {
    if (!normalMode.current) {
      const mrkId = Number(targetMrk.current.options.title);
      const border = {
        south: e.latlng.lat - SELECTION_SIZE / 2,
        north: e.latlng.lat + SELECTION_SIZE / 2,
        east: e.latlng.lng - SELECTION_SIZE / 2,
        west: e.latlng.lng + SELECTION_SIZE / 2,
      };
      const selectHeatData = heatmapData.filter((d) => {
        return (
          mrkId === d.hit_id &&
          border.south < d.lat &&
          border.north > d.lat &&
          border.east < d.lng &&
          border.west > d.lng
        );
      });
      setSelectedData(selectHeatData);
    }
    e.originalEvent.preventDefault();
  };

  const updateLayer = () =>
    normalMode.current ? setSelectionMode() : setNormalMode();
  updateLayer();

  return <div id='map-container' />;
}

export default Map;
