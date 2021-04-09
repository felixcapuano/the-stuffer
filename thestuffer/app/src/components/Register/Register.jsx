import React, { useState, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { authInstance } from '../../axios';

import './Register.css';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const Register = () => {
  const [form, setForm] = useReducer(formReducer, {});
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formFormatted = {
      username: form.username,
      email: form.email,
      password: form.password,
    };

    authInstance.post('/register', formFormatted).then((res) => {
      setMessage(res.data.message);
      history.push('/');
    });
  };

  const handleChange = (event) => {
    setForm({
      name: event.target.id,
      value: event.target.value,
    });
  };

  return (
    <Form className='RegisterForm' onSubmit={handleSubmit}>
      <Form.Group as={Row} controlId='username' onChange={handleChange}>
        <Form.Label column sm='2'>
          Username
        </Form.Label>
        <Col sm='10'>
          <Form.Control type='text' placeholder='Username' />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId='email' onChange={handleChange}>
        <Form.Label column sm='2'>
          Email
        </Form.Label>
        <Col sm='10'>
          <Form.Control type='email' placeholder='Email' />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId='password' onChange={handleChange}>
        <Form.Label column sm='2'>
          Password
        </Form.Label>
        <Col sm='10'>
          <Form.Control type='password' placeholder='Password' />
        </Col>
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
      <p>message : {message}</p>
    </Form>
  );
};

export default Register;
