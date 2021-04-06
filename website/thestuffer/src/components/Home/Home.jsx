import React from 'react';

import { MapMenu } from '../MapMenu'; 

import './Home.css';

const Home = () => {
  return (
    <div>
      <div>
        The place to share and learn csgo stuff.
        <button>Let's roll!</button>
      </div>
      <MapMenu/>
    </div>
  );
}

export default Home;