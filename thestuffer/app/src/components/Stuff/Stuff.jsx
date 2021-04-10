import React from 'react';
import { useLocation } from 'react-router-dom';
import { Map } from '../Map';

import './Stuff.css';

const Stuff = () => {
  const search = useLocation().search;
  const mapParams = new URLSearchParams(search).get('m');

  return (
    <div>
      <Map mapName={mapParams}></Map>
    </div>
  );
};

export default Stuff;
