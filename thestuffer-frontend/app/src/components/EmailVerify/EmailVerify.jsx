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
import Feedback from 'react-bootstrap/esm/Feedback';

const EmailVerify = () => {
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const history = useHistory();
  const [submitEnabled, setSubmitEnabled] = useState(true);

  useEffect(() => {
    authInstance.get('/email/send').then((res) => {
      if (res.data.ok) {
        setFeedback({ type: 'success', message: res.data.message });
      } else {
        setFeedback({ type: 'danger', message: res.data.message });
      }
    });
  }, [setFeedback]);

  const formik = useFormik({
    initialValues: {
      token: '',
    },
    onSubmit: (values) => {
      authInstance.post('/email/verify', values).then((res) => {
        if (res.data.ok) {
          formik.resetForm();
          setFeedback({ type: 'success', message: res.data.message });
          setSubmitEnabled(false);
          setTimeout(() => history.push('/'), 3000);
        } else {
          setFeedback({ type: 'danger', message: res.data.message });
        }
      });
    },
  });

  return (
    <Container fluid as={Row}>
      <Col sm={{ span: 4, offset: 4 }}>
        <Form className='emailVerifyForm' onSubmit={formik.handleSubmit}>
          {feedback.message && (
            <Alert variant={feedback.type}>{feedback.message}</Alert>
          )}
          <p>An email has been sent to you.</p>
          <InputGroup
            name='token'
            type='text'
            handleChange={formik.handleChange}
          >
            Token
          </InputGroup>

          <Button variant='dark' type='submit' disabled={!submitEnabled}>
            Submit
          </Button>
        </Form>
      </Col>
    </Container>
  );
};

export default EmailVerify;
