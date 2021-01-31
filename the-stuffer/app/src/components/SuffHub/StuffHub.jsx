import React, { useState } from 'react';

import Map from '../Map/Map'
import SelectionView from '../SelectionView/SelectionView';

import './StuffHub.css';
import { throw_data, hit_data} from '../SuffHub/data';

function StuffHub(props) {
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const mapName = urlParams.get('m');

    const [selectedData , setSelectedData] = useState([]);

    return (
        // get the map name
        <div className='stuffhub'>
            <Map mapName={mapName}
                normalModeData={hit_data}
                selectionModeData={throw_data}
                setSelectedData={setSelectedData} />
            <SelectionView data={selectedData} />
        </div>
    );
}

export default StuffHub;