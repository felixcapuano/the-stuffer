import React, { useEffect } from 'react';
import './Map.css';
import L, { tileLayer } from 'leaflet';

// marker icon path
const mrk_ico = {
    smoke: 'images/icons/smoke.png',
    flash: 'images/icons/flash.png',
    molotov: 'images/icons/molotov.png',
}

// map configuration
const MAP_CFG = { center: [0, 0],
    zoom: 2,
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


function Map(props) {
    const mapName = props.mapName;
    const markerData = props.markerData;

    let map;
    if (map != undefined) { map.remove(); }

    // marker creation
    const newMarker = (mrk) => {
        return L.marker([mrk.lat, mrk.lng], {
            icon: newStuffIcon(mrk_ico[mrk.type])
        });
    }

    // create tiles
    const mapTile = L.tileLayer('images/maps/{map}/{z}/{y}/{x}.png', {
        map: mapName,
        minZoom: 0,
        maxZoom: 3,
        noWrap: true,
        errorTileUrl: 'images/maps/tiles/empty.png',
    });

    // initialisation markers list by types
    let markersLayer = {
        smoke:   L.layerGroup(),
        flash:   L.layerGroup(),
        molotov: L.layerGroup(),
    };

    // fill markers list with stuff data
    markerData.forEach((mrk) => {
        markersLayer[mrk.type].addLayer(newMarker(mrk));
    });

    useEffect(() => {
        if (map != undefined) { map.remove(); }
        map = L.map('map-container', MAP_CFG);

        map.addLayer(mapTile);

        Object.values(markersLayer).forEach((layer) => map.addLayer(layer));
    });

    return (
        <div id='map-container'></div>
    );
}

export default Map;