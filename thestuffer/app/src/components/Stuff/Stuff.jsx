import React from 'react';
import { useParams } from 'react-router-dom';

import { Map } from '../Map';
import { filler } from '../Map/fill_db';

import './Stuff.css';

const Stuff = () => {
  const params = useParams();

  return (
    <div>
      Stuff {params.map}
      <button disabled onClick={filler}>
        Fill test data
      </button>
      <Map mapName={params.map} />
    </div>
  );
};

export default Stuff;
