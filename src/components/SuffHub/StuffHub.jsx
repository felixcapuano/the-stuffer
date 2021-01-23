import React from 'react';
import './StuffHub.css';
import Map from '../Map/Map'

class StuffHub extends React.Component {
    
    render() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const mapName = urlParams.get('m');

        return (
            // get the map name
            <div className='stuffhub'>
                <Map mapName={mapName} />
            </div>
        );
    }
}

export default StuffHub;