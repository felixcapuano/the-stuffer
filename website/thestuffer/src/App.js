import { useState, useEffect } from 'react';

import Router from './Router';
import AuthContext from './context/AuthContext'

import './App.css';
import { authInstance } from './axios';
import { setToken } from './token';


const App = () => {

  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  const loggedContextValue = {
    logged: logged,
    updateLogged: setLogged,
  };

  useEffect(() => {
    authInstance.get('/token')
      .then(async res => {
        console.log(res.data)
        setToken(res.data.accessToken);
        setLoading(false);
        if (res.data.ok) setLogged(true);
      })
    
  }, []);

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <AuthContext.Provider value={loggedContextValue}>
      user is login : { logged.toString() }
      <Router/>
    </AuthContext.Provider>
  );
}

export default App;
