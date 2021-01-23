import React, { useEffect } from 'react';
import './Map.css';
import L from 'leaflet';

// marker icon path
const mrk_ico = {
    smoke: 'images/icons/smoke.png',
    flash: 'images/icons/flash.png',
    molotov: 'images/icons/molotov.png',
}

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
let stuffLayers = L.layerGroup(Object.values(layers));

const layerControl = L.control.layers({}, layers);

function Map(props) {
    const mapName = props.mapName;
    const markerData = props.markerData;

    let heatMapMode = false;
    let targetMrk = undefined;

    // marker creation
    const newMarker = (mrk) => {
        return L.marker([mrk.lat, mrk.lng], {
            icon: newStuffIcon(mrk_ico[mrk.type]),
            title: mrk.id,
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

    useEffect(() => {
        // create map after component load
        const map = L.map('map-container', mapCfg);

        map.addLayer(mapTile);
        map.addLayer(stuffLayers);
        map.addControl(layerControl);

        const onMarkerClicked = (e) => {
            const _leaflet_id = e.target._leaflet_id;
            
            if (targetMrk === undefined) {

                stuffLayers.eachLayer((l) => { 
                    if (l.hasLayer(_leaflet_id)) {
                        targetMrk = l.getLayer(_leaflet_id);
                    }
                })

                map.removeLayer(stuffLayers);
                map.addLayer(targetMrk);
            } else {
                map.removeLayer(targetMrk);
                map.addLayer(stuffLayers)

                targetMrk = undefined;
            }
            heatMapMode = !heatMapMode;
        }

        // fill markers list with stuff data and add listener
        const fillMarkerGroups = () => {
            markerData.forEach((mrk) => {
                const id = layers[mrk.type]._leaflet_id;
                stuffLayers.getLayer(id).addLayer(
                    newMarker(mrk).on('click', onMarkerClicked));
            });
        }
        fillMarkerGroups();

        return () => map.remove();
    });

    return (
        <div id='map-container'></div>
    );
}

export default Map;