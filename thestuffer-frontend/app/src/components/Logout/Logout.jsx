import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { authInstance } from '../../axios';
import AuthContext from '../../context/AuthContext';
import { setToken } from '../../token';
import Button from 'react-bootstrap/Button';

import './Logout.css';

const Logout = () => {
  const { updateLogged } = useContext(AuthContext);
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();

    authInstance.delete('/logout').then((res) => {
      if (!res.data.ok) return console.error(res.data.message);
      updateLogged(false);
      setToken('');
      history.push('/');
    });
  };

  return (
    <Button variant='outline-danger' onClick={logout}>
      Logout
    </Button>
  );
};

export default Logout;
