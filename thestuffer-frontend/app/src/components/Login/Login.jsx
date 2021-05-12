import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useFormik } from 'formik';

import { authInstance } from '../../axios';
import AuthContext from '../../context/AuthContext';
import { setToken } from '../../token';

import './Login.css';
import { InputGroup } from '../InputGroup';

const Login = () => {
  const { updateLogged } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      authInstance.post('/login', values).then((res) => {
        setMessage(res.data.message);
        if (res.data.ok) {
          updateLogged(true);
          setToken(res.data.accessToken);
          history.push('/');
        }
      });
    },
  });

  return (
    <Form className='LoginForm' onSubmit={formik.handleSubmit}>
      {message && <Alert variant='danger'>{message}</Alert>}
      <InputGroup name='email' type='email' handleChange={formik.handleChange}>
        Email
      </InputGroup>

      <InputGroup
        name='password'
        type='password'
        handleChange={formik.handleChange}
      >
        Password
      </InputGroup>

      <Button variant='light' type='submit'>
        Submit
      </Button>
    </Form>
  );
};

export default Login;
