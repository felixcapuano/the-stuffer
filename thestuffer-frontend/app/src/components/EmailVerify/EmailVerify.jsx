import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useFormik } from 'formik';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import { authInstance } from '../../axios';

import './EmailVerify.css';
import { InputGroup } from '../InputGroup';

const EmailVerify = () => {
  const [message, setMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    authInstance.get('/email/send').then((res) => {
      setMessage(res.data.message);
      if (res.data.ok) {
        setMessage(res.data.message);
      }
    });
  }, [setMessage]);

  const formik = useFormik({
    initialValues: {
      token: '',
    },
    onSubmit: (values) => {
      authInstance.post('/email/verify', values).then((res) => {
        console.log(res);
        setMessage(res.data.message);
        if (res.data.ok) {
          history.push('/');
        }
      });
    },
  });

  return (
    <Container fluid as={Row}>
      <Col sm={{ span: 4, offset: 4 }}>
        <Form className='emailVerifyForm' onSubmit={formik.handleSubmit}>
          {message && <Alert variant='danger'>{message}</Alert>}
          <p>An email has been sent to you.</p>
          <InputGroup
            name='token'
            type='text'
            handleChange={formik.handleChange}
          >
            Token
          </InputGroup>

          <Button variant='dark' type='submit'>
            Submit
          </Button>
        </Form>
      </Col>
    </Container>
  );
};

export default EmailVerify;
