import React, { useContext } from 'react';

import './Logout.css';
import { authInstance } from '../../axios';
import AuthContext from '../../context/AuthContext';

const Logout = () => {

  const { updateLogged } = useContext(AuthContext);

  const logout = (e) => {
    e.preventDefault()

    authInstance.delete('/logout')
      .then(res => {
        if (!res.data.ok) return alert(res.data.message);
        updateLogged(false);
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