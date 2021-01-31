import React from 'react';
import './Home.css';
import MapsMenu from '../MapsMenu/MapsMenu'

function Home() {
    return (
        <div className='home'>
            <h3 id="leading">The place to share and learn csgo stuff.</h3>
            <MapsMenu />
        </div>
    );
}

export default Home;