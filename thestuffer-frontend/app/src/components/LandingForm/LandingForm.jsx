import React, { useMemo, useCallback, useRef } from 'react';
import { useHistory, useLocation } from 'react-router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useFormik } from 'formik';

import { stuffInstance } from '../../axios';
import { Map } from '../Map';

import './LandingForm.css';

const LandingForm = () => {
  const query = new URLSearchParams(useLocation().search);
  const map = query.get('map');

  const history = useHistory();

  const cursor = useRef({
    name: '',
    floor: undefined,
    lat: undefined,
    lng: undefined,
  });

  const formik = useFormik({
    initialValues: {
      collection: 'landing',
      type: 'smoke',
      map: map,
    },
    onSubmit: async (values) => {
      if (cursor.current.floor === undefined)
        return alert('You have to select a position on the map.');
      values.position = {
        lat: parseFloat(cursor.current.lat.toFixed(3)),
        lng: parseFloat(cursor.current.lng.toFixed(3)),
        floor: cursor.current.floor,
      };

      try {
        await stuffInstance.post('/stuff/create', values);

        history.push('/stuff/' + map);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const posSelectionHandler = useCallback(
    ({ event, map }) => {
      cursor.current = { ...cursor.current, ...event.latlng, ...map };
    },
    [cursor]
  );

  const mapRender = useMemo(
    () => (
      <Map
        mapName={map}
        clickHandler={posSelectionHandler}
        disabledThrowing
      />
    ),
    [posSelectionHandler, map]
  );

  if (!map) history.push('/')
  return (
    <Form className='landingForm' onSubmit={formik.handleSubmit}>
      {mapRender}

      <Form.Group as={Row}>
        <Form.Label column className='landingLabel'>
          Type
        </Form.Label>
        <Col>
          <Form.Control
            name='type'
            as='select'
            onChange={formik.handleChange}
            value={formik.values.type}
          >
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
