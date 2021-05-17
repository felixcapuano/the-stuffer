import React, { useCallback, useRef, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
      movement: 'empty',
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
    validationSchema: Yup.object({
      landing_id: Yup.string().length(12),
      movement: Yup.string().matches(/jumpthrow|throw|runjumpthrow/),
      tickrate: Yup.object({
        64: Yup.boolean(),
        128: Yup.boolean(),
      }),
      video: Yup.object({
        id: Yup.string(),
        time: Yup.number().integer(),
      }),
      description: Yup.string().max(255),
    }),
    onSubmit: (values) => {
      if (cursor.current.floor === undefined)
        return alert('You have to select a position on the map.');
      values.position = {
        lat: parseFloat(cursor.current.lat.toFixed(3)),
        lng: parseFloat(cursor.current.lng.toFixed(3)),
        floor: cursor.current.floor,
      };

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

  if (!id || !map) history.push('/');
  return (
    <Col xl={{ span: 10, offset: 1 }}>
      <Form className='throwingForm' onSubmit={formik.handleSubmit}>
        <Form.Row>
          <Col md={{ span: 6 }}>{mapRender}</Col>
          <Col>
            <Form.Row className='textHeader'>
              <Form.Text>
                Welcome, this form allow you to create your own stuff descrition.
              </Form.Text>
              <Form.Text>
                First Select a location on the map by clicking on it.
              </Form.Text>
            </Form.Row>
            <Form.Group
              as={Row}
              controlId='movementGroup'
              className='inputGroup'
            >
              <Form.Label column className='throwingLabel' md='2'>
                Move
              </Form.Label>
              <Col>
                <Form.Control
                  as='select'
                  name='movement'
                  {...formik.getFieldProps('movement')}
                  {...{'isInvalid': formik.touched.movement && formik.errors.movement ? 'true' : ''}}
                >
                  <option value='empty'>Select...</option>
                  <option value='throw'>Throw</option>
                  <option value='jumpthrow'>Jumpthow</option>
                  <option value='runjumpthrow'>Run Jumpthrow</option>
                </Form.Control>
                <Form.Control.Feedback type='invalid'>
                  {formik.errors.movement}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Row className='inputGroup'>
              <Form.Label column className='throwingLabel'>
                Tickrate
              </Form.Label>
              <Col>
                <Form.Check
                  className='tickrateCheckbox'
                  label='64'
                  type='checkbox'
                  onChange={formik.handleChange}
                  defaultChecked={formik.values.tickrate['64']}
                  name='tickrate.64'
                />
              </Col>
              <Col>
                <Form.Check
                  className='tickrateCheckbox'
                  label='128'
                  type='checkbox'
                  onChange={formik.handleChange}
                  defaultChecked={formik.values.tickrate['128']}
                  name='tickrate.128'
                />
              </Col>
            </Form.Row>
            <Form.Row className='inputGroup'>
              <Form.Label column className='throwingLabel' md='2'>
                Youtube Url
              </Form.Label>
              <Col>
                <InputGroup>
                  <Form.Control
                    placeholder='https://www.youtube.com/watch?v=QH2-TGUlwu4&ab_channel=NyanCat'
                    name='video.id'
                    onChange={formik.handleChange}
                    value={formik.values.video.id}
                  />
                  <InputGroup.Append>
                    <Button
                      variant='dark'
                      onClick={() => alert('Enter the full url of the video.')}
                    >
                      ?
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Form.Row>
            <Form.Row className='inputGroup'>
              <Form.Label column className='throwingLabel' md='2'>
                Time
              </Form.Label>
              <Col>
                <InputGroup>
                  <Form.Control
                    type='number'
                    min={0}
                    name='video.time'
                    onChange={formik.handleChange}
                    value={formik.values.video.time}
                  />
                  <InputGroup.Append>
                    <Button
                      variant='dark'
                      onClick={() =>
                        alert(
                          'Enter the start of the important action of the video in seconds.'
                        )
                      }
                    >
                      ?
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Form.Row>
            <Form.Row className='inputGroup'>
              <Form.Label column className='throwingLabel'>
                Description
              </Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Description...'
                maxLength={255}
                rows={2}
                name='description'
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </Form.Row>
            <Form.Row className='inputGroup'>
              <Col sm={{ offset: 10 }}>
                <Button type='submit' variant='dark' block>
                  Submit
                </Button>
              </Col>
            </Form.Row>
          </Col>
        </Form.Row>
      </Form>
    </Col>
  );
};

export default ThrowingForm;
