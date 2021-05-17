import React, { useCallback, useRef, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { stuffInstance } from '../../axios';
import { Map } from '../Map';

import './ThrowingForm.css';

//const ytRegExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
const ytRegExp =
  /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?‌​[\w?‌​=]*)?/;

const ThrowingForm = () => {
  const query = new URLSearchParams(useLocation().search);
  const id = query.get('id');
  const map = query.get('map');
  const history = useHistory();
  const [feedback, setFeedback] = useState({ type: '', message: '' });

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
      collection: 'throwing',
      landing_id: id,
      movement: 'empty',
      tickrate: {
        64: true,
        128: true,
      },
      video: {
        id: '',
        time: '',
      },
      description: '',
    },
    validationSchema: Yup.object({
      collection: Yup.string().matches(/throwing/),
      landing_id: Yup.string().length(24),
      movement: Yup.string().matches(/jumpthrow|throw|runjumpthrow/),
      tickrate: Yup.object({
        64: Yup.boolean(),
        128: Yup.boolean(),
      }),
      video: Yup.object({
        id: Yup.string().matches(ytRegExp),
        time: Yup.number().integer().min(0),
      }),
      description: Yup.string().max(255).trim(),
    }),
    onSubmit: (values) => {
      if (cursor.current.floor === undefined)
        return setFeedback({
          type: 'danger',
          message: 'You have to select a position on the map.',
        });

      const ytId = values.video.id.match(ytRegExp)?.[1];
      if (!ytId || ytId.length !== 11)
        return setFeedback({
          type: 'danger',
          message: 'No video ID detected in the youtube url.',
        });
      values.video.id = ytId;

      values.position = {
        lat: parseFloat(cursor.current.lat.toFixed(3)),
        lng: parseFloat(cursor.current.lng.toFixed(3)),
        floor: cursor.current.floor,
      };

      stuffInstance.post('/stuff/create', values).then((res) => {
        if (res.data.ok) {
          setFeedback({ type: 'success', message: res.data.message });
          formik.resetForm();
        } else {
          setFeedback({ type: 'danger', message: res.data.message });
        }
      });
    },
  });

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
              Welcome, this form allow you to create your own stuff.
              <Form.Text>
                First Select a location on the map by clicking on it.
              </Form.Text>
            </Form.Row>
            {feedback.message && (
              <Alert variant={feedback.type}>{feedback.message}</Alert>
            )}
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
                  {...{
                    isInvalid:
                      formik.touched.movement && formik.errors.movement
                        ? 'true'
                        : '',
                  }}
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
              <Form.Group as={Col} controlId='tickrate64Group'>
                <Form.Check
                  className='tickrateCheckbox'
                  label='64'
                  type='switch'
                  onChange={formik.handleChange}
                  defaultChecked={formik.values.tickrate['64']}
                  name='tickrate.64'
                />
              </Form.Group>
              <Form.Group as={Col} controlId='tickrate128Group'>
                <Form.Check
                  className='tickrateCheckbox'
                  label='128'
                  type='switch'
                  onChange={formik.handleChange}
                  defaultChecked={formik.values.tickrate['128']}
                  name='tickrate.128'
                />
              </Form.Group>
            </Form.Row>
            <Form.Group
              as={Row}
              controlId='videoIdGroup'
              className='inputGroup'
            >
              <Form.Label column className='throwingLabel' md='2'>
                Youtube Url
              </Form.Label>
              <Col>
                <InputGroup>
                  <Form.Control
                    placeholder='https://www.youtube.com/watch?v=QH2-TGUlwu4&ab_channel=NyanCat'
                    name='video.id'
                    {...formik.getFieldProps('video.id')}
                    {...{
                      isInvalid: formik.errors.video?.id ? 'true' : '',
                    }}
                  />
                  <InputGroup.Append>
                    <Button
                      variant='dark'
                      onClick={() => alert('Enter the full url of the video.')}
                    >
                      ?
                    </Button>
                  </InputGroup.Append>
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.video?.id}
                  </Form.Control.Feedback>
                </InputGroup>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              controlId='videoTimeGroup'
              className='inputGroup'
            >
              <Form.Label column className='throwingLabel' md='2'>
                Time
              </Form.Label>
              <Col>
                <InputGroup>
                  <Form.Control
                    type='number'
                    min={0}
                    name='video.time'
                    {...formik.getFieldProps('video.time')}
                    {...{
                      isInvalid:
                        formik.touched.video?.time && formik.errors.video?.time
                          ? 'true'
                          : '',
                    }}
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
                <Form.Control.Feedback type='invalid'>
                  {formik.errors.video?.time}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
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
              <Col sm={{ offset: 9 }}>
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
