import React from 'react';
import { useParams } from 'react-router-dom';

import { Map } from '../_Map';
import StuffDataContext from '../../context/StuffDataContext';

import './Stuff.css';

// simulation TODO change with server import
import { land_data, throw_data } from './data';

const Stuff = () => {
  const params = useParams();

  const initialValue = {
    getThrowingData: (landingId) => {
      return throw_data.filter((data) => data.hit_id === landingId);
    },
    getLandingData: (mapName, id = null) => {
      if (id) {
        return land_data.filter(
          (data) => data.map === mapName && data.id === id
        );
      }
      return land_data.filter((data) => data.map === mapName);
    },
  };

  return (
    <StuffDataContext.Provider value={initialValue}>
      Stuff {params.map}
      <Map />
    </StuffDataContext.Provider>
  );
};

export default Stuff;
