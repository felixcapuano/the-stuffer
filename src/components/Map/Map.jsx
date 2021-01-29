import React, { useEffect, useRef } from 'react';
import './Map.css';

import L from 'leaflet';
import HeatmapOverlay from 'leaflet-heatmap';


// constants
const SELECTION_SIZE = 20;
const HEATMAP_MAX = 3;

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
const layers = {
    'smoke': L.layerGroup(),
    'flash': L.layerGroup(),
    'molotov': L.layerGroup(),
};
const allMarkersLayer = L.layerGroup();

// marker creation
const createMarker = (mrk) => {
    return L.marker([mrk.lat, mrk.lng], {
        icon: newStuffIcon(mrk_ico[mrk.type]),
        title: mrk.id,
    });
}

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
    const setSelectedData = props.setSelectedData;

    // get all map data
    const markerData = props.markerData;
    const heatmapData = props.heatmapData;

    // fill markers list with stuff data
    markerData.forEach((mrk) => {
        const newMrk = createMarker(mrk);

        layers[mrk.type].addLayer(newMrk);
        allMarkersLayer.addLayer(newMrk);
    });

    // init the layer controller
    const layerControl = L.control.layers({}, layers);

    // ????
    let stuffSelection = [];

    // main layer grouping marker dans heatmap layers
    const mainLayer = L.layerGroup();

    // - false normal mode with marker
    // - true selection mode focusing on the clicker marker
    const selectionMode = useRef(false)

    // keep the id of the current clicker/targeted maker by user
    const targetMrkId = useRef(0);
    
    // function to get marker by id (database not leaflet)
    const getMarkerById = (id) => (markerData.filter((m) => m.id === id))[0]

    // set the normal mode on the main layer
    const setNormalMode = () => {
        // add layer from normal mode
        //mainLayer.addControl(layerControl);
        mainLayer.addLayer(allMarkersLayer);
    }

    // set the selection mode on the main layer
    const setSelectionMode = (id) => {

        const mrk = createMarker(getMarkerById(id));

        // filtering data by id to keep only relevent one
        const stuffSelection = heatmapData.filter((d) => d.hit_id === id);

        // set data of the heatmap layer 
        heatmapLayer.setData({ max: HEATMAP_MAX, data: stuffSelection });

        // add heatmap layer and the marker to the layer
        mainLayer.addLayer(mrk);
        mainLayer.addLayer(heatmapLayer);
    }

    const updateLayer = () => {
        // remove all layer diplayed
        mainLayer.clearLayers();

        // if a marker is targeted then
        if (selectionMode.current) {
            console.log('setup selection mode');
            setSelectionMode(targetMrkId.current);
        } else {
            console.log('setup normal mode');
            setNormalMode();
        }
    }
    updateLayer();

    // create map tiles
    const mapTile = L.tileLayer('images/maps/{map}/{z}/{y}/{x}.png', {
        map: mapName,
        minZoom: 0,
        maxZoom: 3,
        noWrap: true,
        errorTileUrl: 'images/maps/tiles/empty.png',
    });

    useEffect(() => {
        const map = L.map('map-container', mapCfg);
        map.addLayer(mapTile);
        map.addLayer(mainLayer);
        
        map.on('click', (e) => {
            console.log(selectionMode);
            if (!selectionMode) {
                const border = {
                    south: e.latlng.lat - SELECTION_SIZE / 2,
                    north: e.latlng.lat + SELECTION_SIZE / 2,
                    east: e.latlng.lng - SELECTION_SIZE / 2,
                    west: e.latlng.lng + SELECTION_SIZE / 2,
                }
                const selectHeatPoint = heatmapData.filter((s) => {
                    return ((border.south < s.lat) &&
                        (border.north > s.lat) &&
                        (border.east < s.lng) &&
                        (border.west > s.lng));
                });
                setSelectedData(selectHeatPoint);
            }
        });

        const onMarkerClicked = (e) => {
            // find the clicked marker id
            const _leaflet_id = e.target._leaflet_id;
            // get the marker object thank to is id
            const targetMrk = allMarkersLayer.getLayer(_leaflet_id);

            targetMrkId.current = Number(targetMrk.options.title);
            selectionMode.current = !selectionMode.current;

            console.log('target Mrk: ' + targetMrkId.current);
            console.log(selectionMode);

            updateLayer();
        }

        // add event listener to button;
        allMarkersLayer.eachLayer((l) => l.on('click', onMarkerClicked)); 

        return () => map.remove();
    });

    return (
        <div>
            <div id='map-container' />
            { stuffSelection }
        </div>
    );
}

export default Map;