import { useState } from 'react';

import Router from './Router';
import AuthContext from './context/AuthContext'

import './App.css';


const App = () => {

  const [logged, setLogged] = useState(false);
  const [token, setToken] = useState("");

  const loggedContextValue = {
    logged: logged,
    updateLogged: setLogged,
    token: token,
    updateToken: setToken,
  };

  return (
    <AuthContext.Provider value={loggedContextValue}>
      user is login : { logged.toString() } { token }
      <Router/>
    </AuthContext.Provider>
  );
}

export default App;
