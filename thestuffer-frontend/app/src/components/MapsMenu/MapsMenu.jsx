import React from 'react';
import './MapsMenu.css';

import Carousel from 'react-bootstrap/Carousel';

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

const carouselItem = maps.map((map) => {
  return (
    <Carousel.Item key={map.key}>
      <img
        src={window.location.origin + '/' + map.thumb}
        className='img-fluid'
        id='thumb-img'
        alt={map.name}
      />
      <Carousel.Caption>
        <div className='mapName'>{map.name}</div>
      </Carousel.Caption>
    </Carousel.Item>
  );
});

const MapsMenu = () => {
  return (
    <Carousel className='mapCarousel' fade indicators={false} interval={7000}>
      {carouselItem}
    </Carousel>
  );
};

export default MapsMenu;
