import React from 'react';
import './Home.css';
import MapsGrid from '../MapsGrid/MapsGrid'

function Home() {
    return (
        <div className='home'>
            <h3 id="leading">The place to share and learn csgo stuff.</h3>
            <MapsGrid />
        </div>
    );
}

export default Home;