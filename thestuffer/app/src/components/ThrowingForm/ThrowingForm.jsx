import React, { useRef, useReducer } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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

  const form = useRef({
    landing_id: id,
    movement: undefined,
    position: {
      floor: undefined,
      lat: undefined,
      lng: undefined,
    },
    tickrate: {
      64: true,
      128: true,
    },
    video: {
      id: undefined,
      time: undefined,
    },
    description: undefined,
  });

  const [idDetected, setUrl] = useReducer((state, action) => {
    const url = action.target.value;
    //const ytRegExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const ytRegExp = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?‌​[\w?‌​=]*)?/;
    const ytId = url.match(ytRegExp)?.[1];

    if (!ytId || ytId.length !== 11) return '';

    form.current.video.id = ytId;

    return ytId;
  }, '');

  const history = useHistory();
  if (!id || !map) return history.push('/');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(form.current);

    // stuffInstance.post('/stuff/create', formFormatted).then((res) => {
    //   console.log(res.data);
    //   setMessage(res.data.message);
    // });
  };

  const posSelectionHandler = ({ event, map }) => {
    form.current = {
      ...form.current,
      position: {
        ...event.latlng,
        floor: map.floor,
      },
    };
    console.log(form.current);
  };

  const inputHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    if (e.target.value === '') value = undefined;
    if (e.target.type === 'checkbox') value = e.target.checked;
    if (e.target.id) {
      const object = form.current[e.target.id] || {};
      name = e.target.id;
      value = { ...object, [e.target.name]: value };
    }

    form.current = {
      ...form.current,
      [name]: value,
    };
  };

  return (
    <Form
      className='throwingForm'
      onSubmit={handleSubmit}
      as={Col}
      xl={{ span: 10, offset: 1 }}
    >
      <Map mapName={map} clickHandler={posSelectionHandler} targetId={id} disabledThrowing />

      <Form.Row>
        <Form.Group as={Col}>
          <Form.Row>
            <Form.Label column className='throwingLabel' md='2'>
              Move
            </Form.Label>
            <Col>
              <Form.Control as='select' name='movement' onChange={inputHandler}>
                <option value=''>Select...</option>
                <option value='throw'>Throw</option>
                <option value='jumpthrow'>Jumpthow</option>
                <option value='runjumpthrow'>Run Jumpthrow</option>
              </Form.Control>
            </Col>
          </Form.Row>
        </Form.Group>

        <Form.Group as={Col} controlId='tickrate'>
          <Form.Row>
            <Form.Label column className='throwingLabel'>
              Tickrate
            </Form.Label>
            <Col>
              <Form.Check
                label='64'
                type='checkbox'
                defaultChecked
                name='64'
                onChange={inputHandler}
              />
            </Col>
            <Col>
              <Form.Check
                label='128'
                type='checkbox'
                defaultChecked
                name='128'
                onChange={inputHandler}
              />
            </Col>
          </Form.Row>
        </Form.Group>
      </Form.Row>

      <Form.Group as={Row} controlId='video'>
        <Form.Label column className='throwingLabel' md='2'>
          Youtube Url/Id
        </Form.Label>
        <Col md='5'>
          <Form.Control
            placeholder='https://www.youtube.com/watch?v=QH2-TGUlwu4&ab_channel=NyanCat'
            name='id'
            onChange={setUrl}
          />
        </Col>
        <Form.Label column className='throwingLabel' md='1'>
          Time
        </Form.Label>
        <Col md='1'>
          <Form.Control
            type='number'
            min={0}
            name='time'
            onChange={inputHandler}
          />
        </Col>
        <Col md='3'>
          <Form.Control value={idDetected} readOnly />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column className='throwingLabel' md='1'>
          Description
        </Form.Label>
        <Col md='9'>
          <Form.Control
            as='textarea'
            placeholder='Description...'
            maxLength={255}
            rows={2}
            name='description'
            value={form.current.description}
            onChange={inputHandler}
          />
        </Col>
        <Col>
          <Button type='submit' variant='outline-light' className='fluid'>
            Submit
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default ThrowingForm;
