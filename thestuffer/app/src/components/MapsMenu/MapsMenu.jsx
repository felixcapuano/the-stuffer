import React from 'react';
import './MapsMenu.css';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const maps = [
  {
    key: 'de_mirage',
    thumb: 'images/thumbnails/de_mirage.jpg',
    name: 'Mirage',
  },
  {
    key: 'de_dust2',
    thumb: 'images/thumbnails/de_dust2.jpg',
    name: 'Dust 2',
  },
  {
    key: 'de_inferno',
    thumb: 'images/thumbnails/de_inferno.jpg',
    name: 'Inferno',
  },
  {
    key: 'de_nuke',
    thumb: 'images/thumbnails/de_nuke.jpg',
    name: 'Nuke',
  },
  {
    key: 'de_vertigo',
    thumb: 'images/thumbnails/de_vertigo.jpg',
    name: 'Vertigo',
  },
  {
    key: 'de_overpass',
    thumb: 'images/thumbnails/de_overpass.jpg',
    name: 'Overpass',
  },
  {
    key: 'de_train',
    thumb: 'images/thumbnails/de_train.jpg',
    name: 'Train',
  },
];

function MapsMenu() {
  const grid = maps.map((map) => {
    return (
      <Col key={map.key}>
        <Link to={'/stuff/' + map.key}>
          <div className='thumbnail'>
            <img
              src={window.location.origin + '/' + map.thumb}
              className='img-fluid'
              id='thumb-img'
              alt={map.name}
            ></img>
            <div className='bottom-left'>{map.name}</div>
          </div>
        </Link>
      </Col>
    );
  });

  return (
    <Container fluid id='maps-menu'>
      <Row>{grid.slice(0, 3)}</Row>
      <Row>{grid.slice(3, 7)}</Row>
    </Container>
  );
}

export default MapsMenu;
