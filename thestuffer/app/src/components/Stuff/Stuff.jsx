import React from 'react';
import { useParams } from 'react-router-dom';
import { Map } from '../Map';

import './Stuff.css';

const Stuff = () => {
  const params = useParams();

  return (
    <div>
      Stuff 
      <Map></Map>
    </div>
  );
};

export default Stuff;
