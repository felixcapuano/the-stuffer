import React, { useEffect } from 'react';
import './Map.css';

import L from 'leaflet';
import HeatmapOverlay from 'leaflet-heatmap';

import { throw_data, hit_data} from '../Map/data';

// marker icon path
const mrk_ico = {
    smoke: 'images/icons/smoke.png',
    flash: 'images/icons/flash.png',
    molotov: 'images/icons/molotov.png',
};

// map configuration
const corner1 = L.latLng( 180, -180);
const corner2 = L.latLng(-180,  180);
const limitBounds = L.latLngBounds(corner1, corner2);
const mapCfg = {
    center: [0, 0],
    zoom: 2,
    maxBounds: limitBounds,
    maxBoundsViscosity: 0.5,
    inertia: false,
    scrollWheelZoom: false,
};

// marker configuration
const ICON_SIZE = 40;
const newStuffIcon = (url) => L.icon({
        iconUrl: url,
        iconSize: [ICON_SIZE, ICON_SIZE], // size of the icon
        iconAnchor: [ICON_SIZE/2, ICON_SIZE/2], // point of the icon which will correspond to marker's location
        popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});

// initialisation markers list by types
let layers = {
    'smoke': L.layerGroup(),
    'flash': L.layerGroup(),
    'molotov': L.layerGroup(),
};
let allMarkersLayer = L.layerGroup();

// initialize heatmap
const heatmapLayer = new HeatmapOverlay({
  // radius should be small ONLY if scaleRadius is true (or small radius is intended)
  // if scaleRadius is false it will be the constant radius used in pixels
  "radius": 2,
  "maxOpacity": .8,
  // scales the radius based on map zoom
  "scaleRadius": true,
  // if set to false the heatmap uses the global maximum for colorization
  // if activated: uses the data maximum within the current map boundaries
  //   (there will always be a red spot with useLocalExtremas true)
  "useLocalExtrema": true,
  // which field name in your data represents the latitude - default "lat"
  latField: 'lat',
  // which field name in your data represents the longitude - default "lng"
  lngField: 'lng',
  // which field name in your data represents the data value - default "value"
  valueField: 'count'
});

function Map(props) {
    const mapName = props.mapName;
    const markerData = hit_data;
    const heatmapData = throw_data ;

    let heatMapMode = false;
    let targetMrk = undefined;

    // marker creation
    const createMarker = (mrk) => {
        return L.marker([mrk.lat, mrk.lng], {
            icon: newStuffIcon(mrk_ico[mrk.type]),
            title: mrk.id,
        });
    }

    // fill markers list with stuff data
    markerData.forEach((mrk) => {
        const newMrk = createMarker(mrk);

        layers[mrk.type].addLayer(newMrk);
        allMarkersLayer.addLayer(newMrk);
    });

    const layerControl = L.control.layers({}, layers);

    // create tiles
    const mapTile = L.tileLayer('images/maps/{map}/{z}/{y}/{x}.png', {
        map: mapName,
        minZoom: 0,
        maxZoom: 3,
        noWrap: true,
        errorTileUrl: 'images/maps/tiles/empty.png',
    });

    // pickup stuff for the heat map by id
    const setHeatmapById = (id) => {
        const hmd = heatmapData.filter((d) => d.hit_id === id);
        heatmapLayer.setData({
            max: 3,
            data: hmd,
        });
    }

    useEffect(() => {
        // create map after component load
        const map = L.map('map-container', mapCfg);

        map.addLayer(mapTile);
        map.addLayer(allMarkersLayer);
        map.addControl(layerControl);

        const onMarkerClicked = (e) => {
            const _leaflet_id = e.target._leaflet_id;
            
            if (!targetMrk) {

                targetMrk = allMarkersLayer.getLayer(_leaflet_id);
                const targetMrkId = Number(targetMrk.options.title);
                setHeatmapById(targetMrkId);

                map.removeControl(layerControl);
                map.removeLayer(allMarkersLayer);
                map.addLayer(targetMrk);
                map.addLayer(heatmapLayer);

            } else {

                map.addControl(layerControl);
                map.removeLayer(targetMrk);
                map.addLayer(allMarkersLayer)
                map.removeLayer(heatmapLayer);
                
                targetMrk = undefined;
            }
            heatMapMode = !heatMapMode;
        }

        // add event listener to button;
        allMarkersLayer.eachLayer((l) => l.on('click', onMarkerClicked)); 

        return () => map.remove();
    });

    return (
            <div id='map-container' />
    );
}

export default Map;