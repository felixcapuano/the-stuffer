import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { authInstance } from '../../axios';

import './User.css';

const User = () => {
  const history = useHistory();

  const [username, setUsername] = useState('undefined');
  const [creation, setCreation] = useState('undefined');
  const [email, setEmail] = useState('undefined');
  const [verifed, setVerified] = useState(false);
  const [role, setRole] = useState('undefined');

  useEffect(() => {
    authInstance.get('/user').then(async (res) => {
      if (!res.data.ok) return history.push('/')
      console.log('request')
      setCreation(res.data.hit.date);
      setRole(res.data.hit.role);
      setUsername(res.data.hit.username);
      setEmail(res.data.hit.email);
      setVerified(res.data.hit.verified);
    });
  }, [setUsername, setCreation, setEmail, setVerified, setRole, history]);

  return (
    <ul>
      <li>{creation}</li>
      <li>{role}</li>
      <li>{email}</li>
      <li>{username}</li>
      <li>{verifed.toString()}</li>
    </ul>
  );
};

export default User;
