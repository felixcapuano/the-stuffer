import React from 'react';
import './GameMap.css';
import { MapContainer, TileLayer } from 'react-leaflet';

const MAP_CFG = {
    center: [0, 0],
    zoom: 2,
    maxBoundsViscosity: 0.5,
    inertia: false,
    scrollWheelZoom: false,
};

function GameMap() {

    // get the map name
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const mapName = urlParams.get('m');

    return (
        <MapContainer
            center={MAP_CFG.center}
            zoom={MAP_CFG.zoom}
            scrollWheelZoom={MAP_CFG.scrollWheelZoom}
            inertia={false}>
            <TileLayer
                noWrap= {true}
                url={`maps/${mapName}/{z}/{y}/{x}.png`}
            />
        </MapContainer>
    );
}

export default GameMap;