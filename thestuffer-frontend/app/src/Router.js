import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Home } from './components/Home';
import { Stuff } from './components/Stuff';
import { NavBar } from './components/NavBar';
import { CreateStuff } from './components/CreateStuff';
import { Login } from './components/Login';
import { User } from './components/User';
import { Register } from './components/Register';
import { EmailVerify } from './components/EmailVerify';
import { Help } from './components/Help';

const Router = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Stuff} />
        <Route exact path='/:map' component={Stuff} />
        <Route path='/create/:type' component={CreateStuff} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
