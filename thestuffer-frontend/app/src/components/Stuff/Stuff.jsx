import React, { useContext, useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';

import { stuffInstance } from '../../axios';
import { Map } from '../Map';
import { Showcase } from '../Showcase';
import { ThrowingCard } from '../ThrowingCard';
import AuthContext from '../../context/AuthContext';

import './Stuff.css';

const CLICK_RADIUS = 5;

const Stuff = () => {
  const params = useParams();
  const [landingTarget, setLandingTarget] = useState(null);
  const { user } = useContext(AuthContext);

  const [{ hits, isLoading, error }, setData] = useState({
    hits: [],
    isLoading: false,
    error: null,
    landingTarget: null,
  });

  const clickHandler = useCallback(
    ({ event, landingMode }) => {
      if (landingMode) return;

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
    },
    [landingTarget, setData]
  );

  const cards =
    hits &&
    hits.map((data) => {
      return <ThrowingCard key={data._id} data={data} />;
    });

  const createButton = () => {
    const type = landingTarget ? `throwing?id=${landingTarget}&` : 'landing?';
    const query = type + 'map=' + params.map;

    // user && !landingTarget && user.role === 'admin';

    return (
      <LinkContainer to={'/stuff/create/' + query}>
        <Button variant='light'>Create new</Button>
      </LinkContainer>
    );
  };

  const mapComponent = useMemo(
    () => (
      <Map
        mapName={params.map}
        clickHandler={clickHandler}
        onChangeTarget={setLandingTarget}
      />
    ),
    [params, setLandingTarget, clickHandler]
  );

  return (
    <div>
      <h1>{landingTarget ? 'Throwing spot' : 'Landing spot'}</h1>
      {mapComponent}
      {!isLoading && !error && (
        <div>
          {user && landingTarget && (
            <LinkContainer
              to={`/stuff/create/throwing?id=${landingTarget}&map=${params.map}`}
            >
              <Button variant='light'>Create new throwing spot</Button>
            </LinkContainer>
          )}
          {user && user.role === 'admin' && !landingTarget && (
            <LinkContainer
              to={`/stuff/create/landing?map=${params.map}`}
            >
              <Button variant='light'>Create new landing spot</Button>
            </LinkContainer>
          )}
          <Showcase>{cards}</Showcase>
        </div>
      )}
      {error && 'Something goes wrong! ' + error}
    </div>
  );
};

export default Stuff;
