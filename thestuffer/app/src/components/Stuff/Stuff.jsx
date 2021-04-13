import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Map } from '../Map';
import { filler } from '../Map/fill_db';

import './Stuff.css';

const Stuff = () => {
  const params = useParams();

  return (
    <div>
      Stuff {params.map} 
      <button onClick={filler}>Fill test data</button>
      {/* <Map
        mapName={params.map}
        landSelected={landSelected}
        throwSelected={throwSelected}
      /> */}
    </div>
  );
};

export default Stuff;
