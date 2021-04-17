import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import './ThrowingCard.css';

const ThrowingCard = ({ data }) => {
  const [open, setOpen] = useState(false);

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

  return (
    <Card className='throwingCard'>
      <Card.Header>
        {data.tickrate['64'] && tickrateBadge('64')}
        {data.tickrate['128'] && tickrateBadge('128')}
        {movementBadge(data.movement)}
      </Card.Header>
      <Card.Body>
        <Card.Text>Description : {data.description}</Card.Text>
        <Button
          className='openButton'
          onClick={() => setOpen(!open)}
          variant='dark'
        >
          {open ? '^' : 'Video'}
        </Button>
        {open && (
          <iframe
            width='100%'
            height='500'
            src={ytUrl}
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default ThrowingCard;
