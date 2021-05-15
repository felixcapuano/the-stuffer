import React, { useCallback, useRef, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useFormik } from 'formik';

import { stuffInstance } from '../../axios';
import { Map } from '../Map';

import './ThrowingForm.css';

const ThrowingForm = () => {
  const query = new URLSearchParams(useLocation().search);
  const id = query.get('id');
  const map = query.get('map');
  const history = useHistory();

  const cursor = useRef({
    name: '',
    floor: undefined,
    lat: undefined,
    lng: undefined,
  });

  const posSelectionHandler = useCallback(
    ({ event, map }) => {
      cursor.current = { ...cursor, ...event.latlng, ...map };
    },
    [cursor]
  );

  const formik = useFormik({
    initialValues: {
      landing_id: id,
      movement: 'jumpthrow',
      tickrate: {
        64: true,
        128: true,
      },
      video: {
        id: '',
        time: 0,
      },
      description: '',
    },
    onSubmit: (values) => {
      if (!cursor.current.floor) return alert('You have to select a position on the map.')
      values.position = {
        lat: parseFloat(cursor.current.lat.toFixed(3)),
        lng: parseFloat(cursor.current.lng.toFixed(3)),
        floor: cursor.current.floor,
      };
      alert(JSON.stringify(values, null, 2));

      stuffInstance.post('/stuff/create', values).then((res) => {
        console.log(res.data);
        //  setMessage(res.data.message);
      });
    },
  });

  // const [idDetected, setUrl] = useReducer((state, action) => {
  //   const url = action.target.value;
  //   //const ytRegExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  //   const ytRegExp =
  //     /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?‌​[\w?‌​=]*)?/;
  //   const ytId = url.match(ytRegExp)?.[1];

  //   if (!ytId || ytId.length !== 11) return '';

  //   form.current.video.id = ytId;

  //   return ytId;
  // }, '');

  const mapRender = useMemo(
    () => (
      <Map
        mapName={map}
        clickHandler={posSelectionHandler}
        targetId={id}
        disabledThrowing
      />
    ),
    [map, id, posSelectionHandler]
  );

  if (!id || !map) return history.push('/');

  return (
    <Col xl={{ span: 10, offset: 1 }}>
      <Form className='throwingForm' onSubmit={formik.handleSubmit}>
        {mapRender}
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Row>
              <Form.Label column className='throwingLabel' md='2'>
                Move
              </Form.Label>
              <Col>
                <Form.Control
                  as='select'
                  name='movement'
                  onChange={formik.handleChange}
                  value={formik.values.movement}
                >
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
                  onChange={formik.handleChange}
                  defaultChecked={formik.values.tickrate['64']}
                  name='tickrate.64'
                />
              </Col>
              <Col>
                <Form.Check
                  label='128'
                  type='checkbox'
                  onChange={formik.handleChange}
                  defaultChecked={formik.values.tickrate['128']}
                  name='tickrate.128'
                />
              </Col>
            </Form.Row>
          </Form.Group>
        </Form.Row>

        <Form.Group as={Row} controlId='video'>
          <Form.Label column className='throwingLabel' md='2'>
            Youtube Url/Id
          </Form.Label>
          <Col md='7'>
            <Form.Control
              placeholder='https://www.youtube.com/watch?v=QH2-TGUlwu4&ab_channel=NyanCat'
              name='video.id'
              onChange={formik.handleChange}
              value={formik.values.video.id}
            />
          </Col>
          <Form.Label column className='throwingLabel' md='1'>
            Time
          </Form.Label>
          <Col md='2'>
            <Form.Control
              type='number'
              min={0}
              name='video.time'
              onChange={formik.handleChange}
              value={formik.values.video.time}
            />
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
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </Col>
          <Col>
            <Button type='submit' variant='outline-light'>
              Submit
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Col>
  );
};

export default ThrowingForm;
