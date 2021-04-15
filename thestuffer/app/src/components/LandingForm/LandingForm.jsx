import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { stuffInstance } from '../../axios';
import { Map } from '../Map';

import './LandingForm.css';

const LandingForm = ({ mapName }) => {
  const history = useHistory();

  const [message, setMessage] = useState('');
  const [cursor, setCursor] = useState({
    name: mapName || 'de_dust2',
    floor: 0,
    lat: 0,
    lng: 0,
    type: 'smoke',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formFormatted = {
      collection: 'landing',
      type: cursor.type,
      map: cursor.name,
      position: {
        lat: parseFloat(cursor.lat.toFixed(3)),
        lng: parseFloat(cursor.lng.toFixed(3)),
        floor: cursor.floor,
      },
    };

    try {
      const res = await stuffInstance.post('/stuff/create', formFormatted);
      if (!res.data.ok) return setMessage(res.data.message);

      history.push('/stuff/' + cursor.name);
    } catch (error) {
      setMessage(error);
    }
  };

  const posSelectionHandler = ({ event, map }) => {
    setCursor({ ...cursor, ...event.latlng, ...map });
  };

  const mapChangeHandler = (e) => {
    setCursor({ ...cursor, name: e.target.value });
  };

  const typeChangeHandler = (e) => {
    setCursor({ ...cursor, type: e.target.value });
  };

  return (
    <Form className='landingForm' onSubmit={handleSubmit}>
      <Map
        mapName={cursor.name}
        clickHandler={posSelectionHandler}
        disabledThrowing
      />
      <Form.Group>
        <Form.Control as='select' name='map' onChange={mapChangeHandler}>
          <option value='de_dust2'>Dust 2</option>
          <option value='de_inferno'>Inferno</option>
          <option value='de_mirage'>Mirage</option>
          <option value='de_nuke'>Nuke</option>
          <option value='de_vertigo'>Vertigo</option>
          <option value='de_train'>Train</option>
          <option value='de_overpass'>Overpass</option>
        </Form.Control>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column className='landingLabel'>
          Position
        </Form.Label>
        <Col>
          <Form.Control readOnly name='lat' value={cursor.lat.toFixed(3)} />
        </Col>
        <Col>
          <Form.Control readOnly name='lng' value={cursor.lng.toFixed(3)} />
        </Col>

        <Form.Label column className='landingLabel'>
          Type
        </Form.Label>
        <Col>
          <Form.Control name='type' as='select' onChange={typeChangeHandler}>
            <option value='smoke'>Smoke</option>
            <option value='flash'>Flash</option>
            <option value='molotov'>Molotov</option>
          </Form.Control>
        </Col>
        <Col>
          <Button type='submit' variant='outline-light'>
            Submit
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default LandingForm;
