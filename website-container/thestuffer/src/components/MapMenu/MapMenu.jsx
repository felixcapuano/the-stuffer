import React from 'react';
import { Link } from 'react-router-dom';

import './MapMenu.css';

const MapMenu = () => {
  const maps = [
    { key: 'de_mirage', name: 'Mirage' },
    { key: 'de_dust2', name: 'Dust 2' },
    { key: 'de_inferno', name: 'Inferno' },
    { key: 'de_nuke', name: 'Nuke' },
    { key: 'de_vertigo', name: 'Vertigo' },
    { key: 'de_overpass', name: 'Overpass' },
    { key: 'de_train', name: 'Train' },
  ];

  const mapsList = maps.map((m) => (
    <li key={m.key}>
      <Link to='/'>{m.name}</Link>
    </li>
  ));

  return (
    <div>
      <ul>{mapsList}</ul>
    </div>
  );
}

export default MapMenu;