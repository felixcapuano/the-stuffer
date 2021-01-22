import React from 'react';
import './StuffHub.css';
import Map from '../Map/Map'
import Carousel from '../Carousel/Carousel';


const hit_data = []

const hit_len = 10;
for (let i = 0; i < hit_len; i++) {
    hit_data.push({
        id: i,
        type: ["smoke", "flash", "molotov"][Math.floor(Math.random() * 3)],
        lat: parseFloat(((Math.random() * 180) - 90).toFixed(2)),
        lng: parseFloat(((Math.random() * 360) - 180).toFixed(2)),
        map: "de_mirage",
        count: 1,
    });
}

function StuffHub() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const mapName = urlParams.get('m');

    return (
    // get the map name
        <div className='stuffhub'>
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label className="btn btn-secondary active">
                    <input type="checkbox" name="disp-stuff" id="toggle-smoke" autoComplete="off" checked /> Smoke
                </label>
                <label className="btn btn-secondary">
                    <input type="checkbox" name="disp-stuff" id="toggle-molotov" autoComplete="off" checked /> Molotov
                </label>
                <label className="btn btn-secondary">
                    <input type="checkbox" name="disp-stuff" id="toggle-flash" autoComplete="off" checked /> Flash
                </label>
            </div>

            <Map mapName={mapName} markerData={hit_data}/>
            <Carousel />
        </div>
    );
}

export default StuffHub;