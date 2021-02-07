import React, { useState } from 'react';
import './StuffForm.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function StuffForm(props) {

  const [youtubeId, setYoutubeId] = useState('No Url');
  const [youtubeTime, setYoutubeTime] = useState(0);
  const [ticks64, setTicks64] = useState(true);
  const [ticks128, setTicks128] = useState(false);
  const [throwType, setThrowType] = useState('jump');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    const newStuff = {
      hit_id: 0,
      lat: 0,
      lng: 0,
      type: throwType,
      yt_id: youtubeId,
      yt_start_time: youtubeTime,
      ticks64: ticks64,
      ticks128: ticks128,
      description: description,
      validated: false,
      likes: 0,
      dislikes: 0,
      reported: [],
      count: 1,
    };
    console.log(newStuff);

    e.preventDefault();
  }

  const handleYtLink = (e) => {
    //format regex youtube link and time
    const link = e.target.value;
    const ytReg = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
    const id = link.match(ytReg);
    if (id) { setYoutubeId(id[1]); }
    else { setYoutubeId('Bad Url'); }
  }

  const handleTicks = (e) => {
    switch (e.target.value) {
      case '64':
        setTicks64(true);
        setTicks128(false);
        break;
      case '128':
        setTicks64(false);
        setTicks128(true);
        break;
      case '64-128':
        setTicks64(true);
        setTicks128(true);
        break;
      default:
        break;
    }
  }

  return (
    <Row><Col sm={{ span: 8, offset: 2 }}>
      <h1 id='heading'>Create new stuff</h1>
      <Form id='suff-form' onSubmit={e => { handleSubmit(e) }}>
        <Form.Group as={Row} controlId='formVideoLink'>
          <Form.Label column sm={3}>Youtube link :</Form.Label>
          <Col md={7}>
            <Form.Control type='text'
              onChange={e => { handleYtLink(e) }}
              placeholder='https://www.youtube.com/watch?v=LDU_Txk06tM'
            />
          </Col>
          <Col md={2}>
            <Form.Control type='number'
              onChange={e => { setYoutubeTime(e.target.value) }}
              placeholder='0 (seconds)'
              min={0}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='formTicks'>
          <Form.Label column sm={4}>Throw Type :</Form.Label>
          <Col onChange={e => { handleTicks(e) }}>
            <Form.Check inline custom type='radio' defaultChecked
              label='64 ticks'
              name='ticks'
              id='ticks-64'
              value='64'
            />
            <Form.Check inline custom type='radio'
              label='128 ticks'
              name='ticks'
              id='ticks-128'
              value='128'
            />
            <Form.Check inline custom type='radio'
              label='64 and 128 ticks'
              name='ticks'
              id='ticks-64-128'
              value='64-128'
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='formThrowType'>
          <Form.Label column sm={4}>Throw Type :</Form.Label>
          <Col onChange={e => { setThrowType(e.target.value) }}>
            <Form.Check inline custom type='radio' defaultChecked
              label='Throw'
              name='throw-type'
              id='throw'
            />
            <Form.Check inline custom type='radio'
              label='Jumpthrow'
              name='throw-type'
              id='jumpthrow'
            />
            <Form.Check inline custom type='radio'
              label='Run Jumpthrow'
              name='throw-type'
              id='runjumpthrow'
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formDescription">
          <Form.Label column sm={4}>Description :</Form.Label>
          <Col>
            <Form.Control as="textarea" rows={3}
              onChange={e => { setDescription(e.target.value) }}
            />
          </Col>
        </Form.Group>

        <Form.Group>
          <Button variant='light' type="submit">Submit</Button>
        </Form.Group>
      </Form>
    </Col></Row>
  );
}

export default StuffForm;