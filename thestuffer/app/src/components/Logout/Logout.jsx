import React, { useContext } from 'react';

import './Logout.css';
import { authInstance } from '../../axios';
import AuthContext from '../../context/AuthContext';
import { setToken } from '../../token';

const Logout = () => {

  const { updateLogged } = useContext(AuthContext);

  const logout = (e) => {
    e.preventDefault()

    authInstance.delete('/logout')
      .then(res => {
        if (!res.data.ok) return console.log(res.data.message);
        updateLogged(false);
        setToken('')
      })
  }

  return (
    <button
      type='button'
      onClick={logout}>
      Logout
    </button>
  );
}

export default Logout;