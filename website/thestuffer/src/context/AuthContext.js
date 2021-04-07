import React from 'react';

export default React.createContext({
  logged: false,
  updateLogged: (isLogged) => {},
  token: "",
  updateToken: (newToken) => {},
});