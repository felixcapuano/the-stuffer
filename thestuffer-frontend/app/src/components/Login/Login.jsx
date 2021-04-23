import React, { useState, useReducer, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { authInstance } from '../../axios';
import AuthContext from '../../context/AuthContext';
import { setToken } from '../../token';

import './Login.css';
import { InputGroup } from '../InputGroup';

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

export default Login;
