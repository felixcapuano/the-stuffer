import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import { useFormik } from 'formik';

import { authInstance } from '../../axios';
import AuthContext from '../../context/AuthContext';
import { setToken } from '../../token';

import './Login.css';
import { InputGroup } from '../InputGroup';

const Login = () => {
  const { updateUser } = useContext(AuthContext);
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
          updateUser(res.data.user);
          setToken(res.data.accessToken);
          history.push('/');
        }
      });
    },
  });

  return (
    <Col className='loginPage' sm={{ span: 4, offset: 4 }}>
      <Form className='loginForm' onSubmit={formik.handleSubmit}>
        {message && <Alert variant='danger'>{message}</Alert>}
        <Form.Row>
          <InputGroup
            name='email'
            type='email'
            handleChange={formik.handleChange}
            value={formik.values.email}
          >
            Email
          </InputGroup>
        </Form.Row>

        <Form.Row>
          <InputGroup
            name='password'
            type='password'
            handleChange={formik.handleChange}
            value={formik.values.password}
          >
            Password
          </InputGroup>
        </Form.Row>
        <Form.Row>
          <Col className='forgetPassword' sm={{offset: 8}}>
            <Link>Forget password</Link>
          </Col>
        </Form.Row>

        <Form.Row>
          <Button variant='dark' type='submit' block={true}>
            Submit
          </Button>
        </Form.Row>
      </Form>
    </Col>
  );
};

export default Login;
