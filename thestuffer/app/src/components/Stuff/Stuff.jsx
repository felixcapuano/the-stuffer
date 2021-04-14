import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';

import { stuffInstance } from '../../axios';
import { Map } from '../Map';
import { Showcase } from '../Showcase';
import { ThrowingCard } from '../ThrowingCard';

import './Stuff.css';

const CLICK_RADIUS = 5;

const Stuff = () => {
  const params = useParams();
  const [landingTarget, setLandingTarget] = useState(null);

  const [{ hits, isLoading, error }, setData] = useState({
    hits: [],
    isLoading: false,
    error: null,
    landingTarget: null,
  });

  const clickHandler = ({ event }) => {
    if (landingTarget === null) return;
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
        if (!res.data.ok) throw new Error(res.data.message);
        setData({
          isLoading: false,
          hits: res.data.hits,
        });
      })
      .catch((error) => setData({ isLoading: false, error }));
  };

  const cards =
    hits &&
    hits.map((data) => {
      return <ThrowingCard key={data._id} data={data} />;
    });

  const createButton = () => {
    const type = landingTarget ? 'throwing?id=' + landingTarget : 'landing';

    return (
      <LinkContainer to={'/stuff/create/' + type}>
        <Button variant='light'>Create new</Button>
      </LinkContainer>
    );
  };

  return (
    <div>
      <h1>{landingTarget ? 'Throwing spot' : 'Landing spot'}</h1>
      <Map
        mapName={params.map}
        clickHandler={clickHandler}
        onChangeTarget={setLandingTarget}
      />
      {!isLoading && !error && (
        <div>
          {createButton()}
          <Showcase>{cards}</Showcase>
        </div>
      )}
      {error && 'Something goes wrong!'}
    </div>
  );
};

export default Stuff;
