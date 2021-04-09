import React, { useState, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { InputGroup } from '../InputGroup';
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
      if (res.data.ok) history.push('/user/login');
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
      <InputGroup name='username' type='text' handleChange={handleChange}>
        Username
      </InputGroup>

      <InputGroup name='email' type='email' handleChange={handleChange}>
        Email
      </InputGroup>

      <InputGroup name='password' type='password' handleChange={handleChange}>
        Password
      </InputGroup>

      <Button variant='primary' type='submit'>
        Submit
      </Button>
      <p>message : {message}</p>
    </Form>
  );
};

export default Register;
