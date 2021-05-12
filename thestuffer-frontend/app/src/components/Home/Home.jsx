import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

import { MapsMenu } from '../MapsMenu';

import './Home.css';

const Home = () => {
  
  return (
    <div>
      <Jumbotron className='homeJumbotron'>
        <h1>Hello, world!</h1>
        <p>The place to share and learn Counter Strike Global Offensive stuff.</p>
        <p>
          <Button variant='dark'>Let's roll</Button>
        </p>
      </Jumbotron>
      <MapsMenu />
    </div>
  );
};

export default Home;
