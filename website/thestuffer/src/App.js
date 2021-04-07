import { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Home } from './components/Home';
import { Stuff } from './components/Stuff';
import { NavBar } from './components/NavBar';
import { CreateStuff } from './components/CreateStuff';
import { Login } from './components/Login';
import { User } from './components/User';
import { Register } from './components/Register';
import AuthContext from './context/AuthContext'

import './App.css';

function App() {

  const [logged, setLogged] = useState(false);
  const [token, setToken] = useState("");

  const loggedContextValue = {
    logged: logged,
    updateLogged: setLogged,
    token: token,
    updateToken: setToken,
  }

  return (
    <AuthContext.Provider value={loggedContextValue}>
      user is login : { logged.toString() }
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
        <Switch>
          <Route exact path='/stuff' component={Stuff} />
          <Route path='/stuff/create/:type' component={CreateStuff} />
        </Switch>
        <Switch>
          <Route exact path='/user' component={User} />
          <Route path='/user/login' component={Login} />
          <Route path='/user/register' component={Register} />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
