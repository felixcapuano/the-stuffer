import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { authInstance } from '../../axios';

import './Register.css';

const Register = () => {
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      repassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().max(30).required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(8).max(100).required(),
      repassword: Yup.string().min(8).max(100).required(),
    }),
    onSubmit: (values) => {
      console.log(values);
      if (values.password !== values.repassword) {
        return setFeedback({
          type: 'danger',
          message: 'Password are not equals.',
        });
      }

      authInstance
        .post('/register', {
          username: values.username,
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          if (res.data.ok) {
            setFeedback({ type: 'success', message: res.data.message });
            return history.push('/user/login');
          } else {
            setFeedback({ type: 'danger', message: res.data.message });
          }
        });
    },
  });

  const inputField = (fieldName, placeholder = '', fieldType) => {
    return (
      <Form.Row className='registerInput'>
        <Form.Control
          name={fieldName}
          type={fieldType}
          placeholder={placeholder}
          {...formik.getFieldProps(fieldName)}
          {...{
            isInvalid:
              formik.touched[fieldName] && formik.errors[fieldName]
                ? 'true'
                : '',
          }}
        />
        <Form.Control.Feedback type='invalid'>
          {formik.errors[fieldName]}
        </Form.Control.Feedback>
      </Form.Row>
    );
  };

  return (
    <Col sm={{ span: 6, offset: 3 }}>
      <Form className='registerForm' onSubmit={formik.handleSubmit}>
        {feedback.message && (
          <Alert variant={feedback.type}>{feedback.message}</Alert>
        )}
        {inputField('username', 'Username', 'text')}
        {inputField('email', 'Email', 'email')}
        {inputField('password', 'Password', 'password')}
        {inputField('repassword', 'Type again your password', 'password')}

        <Button variant='dark' type='submit'>
          Submit
        </Button>
      </Form>
    </Col>
  );
};

export default Register;
