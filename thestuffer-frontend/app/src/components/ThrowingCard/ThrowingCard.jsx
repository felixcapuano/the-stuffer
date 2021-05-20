import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Collapse from 'react-bootstrap/Collapse';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';

import { stuffInstance } from '../../axios';
import './ThrowingCard.css';

const ThrowingCard = ({ data }) => {
  const [open, setOpen] = useState(false);

  const initialReaction = { like: false, dislike: false };
  const [reaction, setReaction] = useState(initialReaction);

  const ytUrl = `https://www.youtube.com/embed/${data.video.id}?start=${data.video.time}`;

  const tickrateBadge = (tickrate) => (
    <Badge className='tickBadge' variant='dark'>
      {tickrate}
    </Badge>
  );

  const movementBadge = (movement) => {
    const colorBinding = {
      throw: 'success',
      jumpthrow: 'warning',
      runjumpthrow: 'danger',
    };
    return <Badge variant={colorBinding[movement]}>{movement}</Badge>;
  };

  const react = async (_type) => {
    setReaction({ ...initialReaction, [_type]: !reaction[_type] });

    console.log(reaction)

    const path = `/stuff/react/${data._id}?type=${_type}`;
    try {
      await stuffInstance.put(path);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='cardBody'>
      <Row>
        <Col lg={8} md={6} className='text-left'>
          <h4>
            {data.tickrate['64'] && tickrateBadge('64')}
            {data.tickrate['128'] && tickrateBadge('128')}
            {movementBadge(data.movement)}
          </h4>
        </Col>
        <ButtonGroup lg={4} md={6} as={Col}>
          <Button variant='success' onClick={async () => await react('like')}>
            <img src='/images/icons/like.png' width='30' alt='like' />
            <span className='reactButtonValue'>
              {data.like.length + reaction.like}
            </span>
          </Button>
          <Button variant='danger' onClick={async () => await react('dislike')}>
            <img src='/images/icons/dislike.png' width='30' alt='dislike' />
            <span className='reactButtonValue'>
              {data.dislike.length + reaction.dislike}
            </span>
          </Button>
        </ButtonGroup>
      </Row>
      <Row className='contentRow'>
        <Col md={{ span: 7 }} className='text-left'>
          {data.description}
        </Col>
        <Col md={{ span: 4, offset: 1 }}>
          <Button
            variant={open ? 'outline-dark' : 'dark'}
            block
            onClick={() => setOpen(!open)}
            aria-controls='video-collapse'
            aria-expanded={open}
          >
            {open ? 'Hide' : 'View'}
          </Button>
        </Col>
      </Row>
      <Collapse as={Row} in={open}>
        <iframe
          width='100%'
          height='374'
          src={ytUrl}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      </Collapse>
      <Row className='infoRow'>
        <Col className='text-left'>Created by : {data.creator}</Col>
        <Col className='dateText'>
          {new Date(data.last_update_date).toUTCString()}
        </Col>
      </Row>
    </div>
  );
};

export default ThrowingCard;
