import React from 'react';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './InputGroup.css';

const InputGroup = ({ handleChange, type, name, children }) => {
  return (
    <Form.Group as={Row} controlId={name} onChange={handleChange}>
      <Form.Label column sm='2'>
        {children}
      </Form.Label>
      <Col sm='10'>
        <Form.Control type={type} placeholder={children} />
      </Col>
    </Form.Group>
  );
};

export default InputGroup;
