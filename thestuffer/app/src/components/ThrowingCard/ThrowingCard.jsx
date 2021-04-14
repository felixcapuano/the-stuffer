import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import './ThrowingCard.css';

const ThrowingCard = ({ data }) => {
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
    return (<Badge variant={colorBinding[movement]}>
        {movement}
    </Badge>)
  };

  return (
    <Card className='throwingCard'>
      <div>
        {data.tickrate['64'] && tickrateBadge('64')}
        {data.tickrate['128'] && tickrateBadge('128')}
        {movementBadge(data.movement)}
      </div>
      <Card.Body>
        <Card.Text>Description : {data.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ThrowingCard;
