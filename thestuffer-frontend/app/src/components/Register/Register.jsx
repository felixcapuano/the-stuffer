import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useFormik } from 'formik';

import { InputGroup } from '../InputGroup';
import { authInstance } from '../../axios';

import './Register.css';

const Register = () => {
  const [message, setMessage] = useState('');
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      authInstance.post('/register', values).then((res) => {
        setMessage(res.data.message);
        if (res.data.ok) history.push('/user/login');
      });
    },
  });

  return (
    <Form className='RegisterForm' onSubmit={formik.handleSubmit}>
      {message && <Alert variant='danger'>{message}</Alert>}
      <InputGroup
        name='username'
        type='text'
        handleChange={formik.handleChange}
      >
        Username
      </InputGroup>

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

      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};

export default Register;
