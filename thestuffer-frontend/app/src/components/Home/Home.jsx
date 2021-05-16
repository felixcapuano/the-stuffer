import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { MapsMenu } from '../MapsMenu';

import './Home.css';

const Home = () => {
  return (
    <div>
      <Jumbotron className='homeJumbotron' fluid>
        <h1>Hello, world!</h1>
        <p>
          The place to share and learn Counter Strike Global Offensive stuff.
        </p>
        <p>
          <Button variant='dark'>Let's roll</Button>
        </p>
      </Jumbotron>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <MapsMenu />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
