import React, { useState } from 'react';
import './StuffHub.css';
import Map from '../Map/Map'
import SelectionView from '../SelectionView/SelectionView';

function StuffHub(props) {
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const mapName = urlParams.get('m');

    const [selectedData , setSelectedData] = useState([]);

    return (
        // get the map name
        <div className='stuffhub'>
            <Map mapName={mapName}
                setSelectedData={setSelectedData} />
            <SelectionView data={selectedData} />
        </div>
    );
}

export default StuffHub;