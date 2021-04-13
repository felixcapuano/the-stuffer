import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Map } from '../_Map';

import './Stuff.css';

const Stuff = () => {
  const params = useParams();

  const landSelected = useRef();
  const throwSelected = useRef();

  return (
    <div>
      Stuff {params.map} {landSelected.current}
      <Map landSelected={landSelected} throwSelected={throwSelected} />
    </div>
  );
};

export default Stuff;
