import React, { useState, useReducer, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { stuffInstance } from '../../axios';
import { Map } from '../Map';

import './ThrowingForm.css';

const ThrowingForm = () => {
  const query = new URLSearchParams(useLocation().search);
  const id = query.get('id');
  const map = query.get('map');

  const [message, setMessage] = useState('');
  const [cursor, setCursor] = useState({
    floor: 0,
    lat: 0,
    lng: 0,
  });
  const form = useRef({
    movement: 'throw',
    64: true,
    128: true,
    url: '',
    time: 0,
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formFormatted = {
      collection: 'throwing',
      landing_id: id,
      movement: form.current.movement,
      position: {
        lat: parseFloat(cursor.lat.toFixed(3)),
        lng: parseFloat(cursor.lng.toFixed(3)),
        floor: cursor.floor,
      },
      video: {
        id: form.videoId,
        time: parseInt(form.videoTime),
      },
      tickrate: {
        64: form.current['64'] ? true : false,
        128: form.current['128'] ? true : false,
      },
      description: form.current.description,
    };
    console.log(formFormatted);

    // stuffInstance.post('/stuff/create', formFormatted).then((res) => {
    //   console.log(res.data);
    //   setMessage(res.data.message);
    // });
  };

  const posSelectionHandler = ({ event, map }) => {
    setCursor({ ...cursor, ...event.latlng });
  };

  const formHandler = (e) => {
    form.current = {
      ...form.current,
      [e.target.name]: e.target.value,
    };
    console.log(form.current);
  };

  if (!id || !map) return 'Error';
  return (
    <Form className='throwingForm' onSubmit={handleSubmit}>
      <Map mapName={map} clickHandler={posSelectionHandler} disabledThrowing />
      <Form.Group as={Row}>
        <Form.Label column className='throwingLabel'>
          id
        </Form.Label>
        <Col>
          <Form.Control readOnly value={id} />
        </Col>
        <Form.Label column className='throwingLabel'>
          Position
        </Form.Label>
        <Col>
          <Form.Control readOnly name='lat' value={cursor.lat.toFixed(3)} />
        </Col>
        <Col>
          <Form.Control readOnly name='lng' value={cursor.lng.toFixed(3)} />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column className='throwingLabel'>
          Movement
        </Form.Label>
        <Col>
          <Form.Control
            as='select'
            name='movement'
            defaultValue={form.current.movement}
          >
            <option value='throw'>Throw</option>
            <option value='jumpthrow'>Jumpthow</option>
            <option value='runjumpthrow'>Run Jumpthrow</option>
          </Form.Control>
        </Col>
        <Form.Label column className='throwingLabel'>
          Tickrate
        </Form.Label>
        <Col>
          <Form.Check
            label='64'
            type='checkbox'
            defaultChecked={form.current['64']}
          />
        </Col>
        <Col>
          <Form.Check
            label='128'
            type='checkbox'
            defaultChecked={form.current['128']}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column className='throwingLabel'>
          Url
        </Form.Label>
        <Col>
          <Form.Control
            defaultValue={form.current.url}
            placeholder='https://www.youtube.com/watch?v=QH2-TGUlwu4&ab_channel=NyanCat'
          />
        </Col>
        <Form.Label column className='throwingLabel'>
          Time
        </Form.Label>
        <Col>
          <Form.Control
            type='number'
            defaultValue={form.current.time}
            min={0}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column className='throwingLabel'>
          Description
        </Form.Label>
        <Col>
          <Form.Control
            as='textarea'
            name='description'
            placeholder='Description...'
            defaultValue={form.current.description}
            onChange={formHandler}
          />
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

export default ThrowingForm;
