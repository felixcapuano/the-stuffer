import React from 'react';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import './InputGroup.css';

const InputGroup = ({ handleChange, type, name, children }) => {
  return (
    <Form.Group as={Col} controlId={name} onChange={handleChange}>
      <Form.Control type={type} placeholder={children} />
    </Form.Group>
  );
};

export default InputGroup;
