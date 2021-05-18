import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Showcase.css';

const Showcase = ({ children, page, setPage }) => {
  return (
    <div className='showcase'>
      {children}
      <Row className='commandRow'>
        <Button
          as={Col}
          variant='dark'
          lg={{ span: 1, offset: 4 }}
          onClick={setPage((page -= 1))}
        >
          {'<'}
        </Button>
        <Col lg={{ span: 2 }}>
          <h3>{page}</h3>
        </Col>
        <Button
          as={Col}
          variant='dark'
          lg={{ span: 1 }}
          onClick={setPage((page += 1))}
        >
          {'>'}
        </Button>
      </Row>
    </div>
  );
};

export default Showcase;
