import React, { useState, useReducer, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { authInstance } from '../../axios';
import AuthContext from '../../context/AuthContext';
import { setToken } from '../../token';

import './Login.css';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const Login = () => {
  const [form, setForm] = useReducer(formReducer, {});
  const { updateLogged } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formFormatted = {
      email: form.email,
      password: form.password,
    };

    authInstance.post('/login', formFormatted).then((res) => {
      setMessage(res.data.message);
      if (res.data.ok) {
        updateLogged(true);
        setToken(res.data.accessToken);
        history.push('/');
      }
    });
  };

  const handleChange = (e) => {
    setForm({
      name: e.target.id,
      value: e.target.value,
    });
  };

  return (
    <Form className='LoginForm' onSubmit={handleSubmit}>
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

export default Login;