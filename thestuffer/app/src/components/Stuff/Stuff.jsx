import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { stuffInstance } from '../../axios';

import { Map } from '../Map';
import { filler } from '../Map/fill_db';

import './Stuff.css';

const CLICK_RADIUS = 5;

const Stuff = () => {
  const params = useParams();

  const [{ hits, isLoading, error }, setData] = useState({
    hits: [],
    isLoading: true,
    error: null,
  });

  const clickHandler = ({ event, landingTarget }) => {
    if (landingTarget === null) return null;
    const pos = event.latlng;
    const payload = {
      collection: 'throwing',
      landing_id: landingTarget,
      position: {
        lat: {
          gt: pos.lat - CLICK_RADIUS,
          lt: pos.lat + CLICK_RADIUS,
        },
        lng: {
          gt: pos.lng - CLICK_RADIUS,
          lt: pos.lng + CLICK_RADIUS,
        },
        floor: 0,
      },
    };

    setData({ isLoading: true });

    stuffInstance
      .post('/stuff/search', payload)
      .then((res) => {
        console.log(res.data.hits);
        if (!res.data.ok) throw new Error(res.data.message);
        setData({ isLoading: false, hits: res.data.hits });
      })
      .catch((error) => setData({ isLoading: false, error }));
  };

  return (
    <div>
      Stuff {params.map}
      <button disabled onClick={filler}>
        Fill test data
      </button>
      <Map mapName={params.map} clickHandler={clickHandler} />
      {JSON.stringify(hits)}
    </div>
  );
};

export default Stuff;
