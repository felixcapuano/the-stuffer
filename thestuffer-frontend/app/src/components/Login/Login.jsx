import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { authInstance } from '../../axios';
import AuthContext from '../../context/AuthContext';
import { setToken } from '../../token';

import './Login.css';
import { InputGroup } from '../InputGroup';

const Login = () => {
  const { updateUser } = useContext(AuthContext);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
      authInstance.post('/login', values).then((res) => {
        if (res.data.ok) {
          updateUser(res.data.user);
          setToken(res.data.accessToken);
          setFeedback({ type: 'success', message: res.data.message });
          return history.push('/');
        } else {
          setFeedback({ type: 'danger', message: res.data.message });
        }
      });
    },
  });

  return (
    <Col className='loginPage' sm={{ span: 4, offset: 4 }}>
      <Form className='loginForm' onSubmit={formik.handleSubmit}>
        {feedback.message && (
          <Alert variant={feedback.type}>{feedback.message}</Alert>
        )}
        <Form.Row className='loginInput'>
          <Form.Control
            name='email'
            type='text'
            placeholder='Email'
            {...formik.getFieldProps('email')}
            {...{
              isInvalid:
                formik.touched.email && formik.errors.email ? 'true' : '',
            }}
          />
          <Form.Control.Feedback type='invalid'>
            {formik.errors.email}
          </Form.Control.Feedback>
        </Form.Row>

        <Form.Row className='loginInput'>
          <Form.Control
            name='password'
            type='password'
            placeholder='Password'
            {...formik.getFieldProps('password')}
            {...{
              isInvalid:
                formik.touched.password && formik.errors.password ? 'true' : '',
            }}
          />
          <Form.Control.Feedback type='invalid'>
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Row>
        <Form.Row>
          <Col className='forgetPassword' sm={{ offset: 8 }}>
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
