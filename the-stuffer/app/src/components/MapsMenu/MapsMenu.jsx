import React from 'react';
import './MapsMenu.css';
import { Link } from 'react-router-dom';

// images imports
import img_mirage from './thumbnails/de_mirage.jpg'
import img_dust2 from './thumbnails/de_dust2.jpg'
import img_inferno from './thumbnails/de_inferno.jpg'
import img_nuke from './thumbnails/de_nuke.jpg'
import img_vertigo from './thumbnails/de_vertigo.jpg'
import img_overpass from './thumbnails/de_overpass.jpg'
import img_train from './thumbnails/de_train.jpg'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MapsMenu() {
  const maps = [
    { key: "de_mirage", thumb: img_mirage, name: "Mirage" },
    { key: "de_dust2", thumb: img_dust2, name: "Dust 2" },
    { key: "de_inferno", thumb: img_inferno, name: "Inferno" },
    { key: "de_nuke", thumb: img_nuke, name: "Nuke" },
    { key: "de_vertigo", thumb: img_vertigo, name: "Vertigo" },
    { key: "de_overpass", thumb: img_overpass, name: "Overpass" },
    { key: "de_train", thumb: img_train, name: "Train" },
  ];

  const grid = maps.map((map) => {
    return (
      <Col key={map.key}>
        <Link to={"/stuffhub?m=" + map.key}><div className="thumbnail">
          <img src={map.thumb} className="img-fluid" id="thumb-img" alt={map.name}></img>
          <div className="bottom-left">{map.name}</div>
        </div></Link>
      </Col>
    )
  });

  return (
    <Container fluid id='maps-menu'>
      <Row>
        {grid.slice(0,3)}
      </Row>
      <Row>
        {grid.slice(3,7)}
      </Row>
    </Container>
  );
}

export default MapsMenu;