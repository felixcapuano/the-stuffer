import { useState, useEffect } from 'react';

import Router from './Router';
import AuthContext from './context/AuthContext';
import { authInstance } from './axios';
import { setToken } from './token';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [user, updateUser] = useState(false);
  const [loading, setLoading] = useState(true);

  const userContextValue = { user, updateUser };

  // useEffect(() => {
  //   authInstance.get('/token').then(async (res) => {
  //     console.log(res.data);
  //     setToken(res.data.accessToken);
  //     setLoading(false);
  //     if (res.data.ok) updateUser(res.data.user);
  //   });
  // }, [setLoading, updateUser]);

  // if (loading) {
  //   return <div>Waiting for server response...</div>;
  // }

  return (
    <div className='App'>
      <AuthContext.Provider value={userContextValue}>
        <Router />
      </AuthContext.Provider>
    </div>
  );
};

export default App;
