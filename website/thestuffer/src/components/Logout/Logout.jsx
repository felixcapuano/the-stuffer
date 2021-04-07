import React from 'react';
import axios from 'axios';

import './Logout.css';

const AUTH_HOST = process.env.REACT_APP_AUTH_HOST;
const AUTH_PORT = process.env.REACT_APP_AUTH_PORT;
const url = `http://${AUTH_HOST}:${AUTH_PORT}/logout`;

const Logout = () => {

  const logout = (e) => {
    e.preventDefault()

    axios.delete(url)
      .then(res => {
        console.log(res);

      }, console.error)
      .catch(err => {
        console.error(err.message);
      });
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