import React, { useMemo, useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useFormik } from 'formik';

import { stuffInstance } from '../../axios';
import { Map } from '../Map';

import './LandingForm.css';

const LandingForm = ({ mapName }) => {
  const history = useHistory();

  const [cursor, setCursor] = useState({
    name: mapName || 'de_dust2',
    floor: 0,
    lat: 0,
    lng: 0,
  });

  const formik = useFormik({
    initialValues: {
      collection: 'landing',
      type: 'smoke',
      map: 'de_dust2',
    },
    onSubmit: async (values) => {
      values.position = {
        lat: parseFloat(cursor.lat.toFixed(3)),
        lng: parseFloat(cursor.lng.toFixed(3)),
        floor: cursor.floor,
      };
      alert(JSON.stringify(values, null, 2));

      try {
        await stuffInstance.post('/stuff/create', values);

        history.push('/stuff/' + cursor.name);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const posSelectionHandler = useCallback(
    ({ event, map }) => {
      setCursor({ ...cursor, ...event.latlng, ...map });
    },
    [cursor]
  );

  const mapRender = useMemo(
    () => (
      <Map
        mapName={cursor.name}
        clickHandler={posSelectionHandler}
        disabledThrowing
      />
    ),
    [cursor, posSelectionHandler]
  );

  return (
    <Form className='landingForm' onSubmit={formik.handleSubmit}>
      {mapRender}
      <Form.Group>
        <Form.Control
          as='select'
          name='map'
          onChange={formik.handleChange}
          value={formik.values.map}
        >
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
