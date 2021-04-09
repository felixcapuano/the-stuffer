import React, { useContext } from 'react';

import { authInstance } from '../../axios';
import AuthContext from '../../context/AuthContext';
import { setToken } from '../../token';
import Button from 'react-bootstrap/Button';

import './Logout.css';

const Logout = () => {
  const { updateLogged } = useContext(AuthContext);

  const logout = (e) => {
    e.preventDefault();

    authInstance.delete('/logout').then((res) => {
      if (!res.data.ok) return console.log(res.data.message);
      updateLogged(false);
      setToken('');
    });
  };

  return (
    <Button variant='outline-danger' onClick={logout}>
      Logout
    </Button>
  );
};

export default Logout;
