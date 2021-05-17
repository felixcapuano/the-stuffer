import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import { authInstance } from '../../axios';

import './User.css';

const User = () => {
  const history = useHistory();

  const [username, setUsername] = useState('undefined');
  const [creation, setCreation] = useState('undefined');
  const [email, setEmail] = useState('undefined');
  const [verified, setVerified] = useState(false);
  const [role, setRole] = useState('undefined');

  useEffect(() => {
    authInstance.get('/user').then(async (res) => {
      if (!res.data.ok) return history.push('/');
      setCreation(res.data.hit.date);
      setRole(res.data.hit.role);
      setUsername(res.data.hit.username);
      setEmail(res.data.hit.email);
      setVerified(res.data.hit.verified);
    });
  }, [setUsername, setCreation, setEmail, setVerified, setRole, history]);

  return (
    <Col xl={{ span: 4, offset: 4 }}>
      <Form className='profile'>
        <img src='/images/icons/profileIcon.png' className='profileIcon' />
        <InputGroup className='profileInput'>
          <InputGroup.Prepend>
            <InputGroup.Text>Role</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control value={role} readOnly />
        </InputGroup>
        <InputGroup className='profileInput'>
          <InputGroup.Prepend>
            <InputGroup.Text>Username</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control value={username} readOnly />
        </InputGroup>
        <InputGroup className='profileInput'>
          <InputGroup.Prepend>
            <InputGroup.Text>Email</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control value={email} readOnly />
        </InputGroup>
        <InputGroup className='profileInput'>
          <InputGroup.Prepend>
            <InputGroup.Text>Password</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control value='************' readOnly />
          <InputGroup.Append>
            <Button variant='dark'>Change password</Button>
          </InputGroup.Append>
        </InputGroup>
        <InputGroup className='profileInput'>
          <InputGroup.Prepend>
            <InputGroup.Text>Verified</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control value={verified.toString()} readOnly />
          {!verified && (
            <InputGroup.Append>
              <InputGroup.Text>
                <Link to='/user/verification'>(verify email)</Link>
              </InputGroup.Text>
            </InputGroup.Append>
          )}
        </InputGroup>
        {/* <li>{role}</li>
      <li>{email}</li>
      <li>{username}</li>
      <li>
        {verifed.toString()}
        {!verifed && <Link to='/user/verification'>(verify email)</Link>}
      </li> */}
      </Form>
    </Col>
  );
};

export default User;
