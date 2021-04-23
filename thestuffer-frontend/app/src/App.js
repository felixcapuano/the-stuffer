import { useState, useEffect } from 'react';

import Router from './Router';
import AuthContext from './context/AuthContext';
import { authInstance } from './axios';
import { setToken } from './token';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  const loggedContextValue = {
    logged: logged,
    updateLogged: setLogged,
  };

  useEffect(() => {
    authInstance.get('/token').then(async (res) => {
      console.log(res.data);
      setToken(res.data.accessToken);
      setLoading(false);
      if (res.data.ok) setLogged(true);
    });
  }, [setLoading, setLogged]);

  if (loading) {
    return <div>Waiting for server response...</div>;
  }

  return (
    <div className='App'>
      <AuthContext.Provider value={loggedContextValue}>
        user is logged : {logged.toString()}
        <Router />
      </AuthContext.Provider>
    </div>
  );
};

export default App;
