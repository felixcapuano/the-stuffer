import React from 'react';

export default React.createContext({
  logged: false,
  updateLogged: (_logged) => {},
  token: '',
  updateToken: (_token) => {},
});