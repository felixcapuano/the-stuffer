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

  const inputField = (fieldName, placeholder = '', fieldType) => {
    return (
      <Form.Row className='loginInput'>
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
    <Col className='loginPage' sm={{ span: 4, offset: 4 }}>
      <Form className='loginForm' onSubmit={formik.handleSubmit}>
        {feedback.message && (
          <Alert variant={feedback.type}>{feedback.message}</Alert>
        )}

        {inputField('email', 'Email', 'email')}
        {inputField('password', 'Password', 'password')}

        <Form.Row>
          <Col className='forgetPassword' sm={{ offset: 8 }}>
            <Link to='/'>Forget password</Link>
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
