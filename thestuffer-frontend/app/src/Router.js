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
        <Route exact path='/' component={Home} />
        <Route path='/help' component={Help} />
      </Switch>
      <Switch>
        <Route exact path='/stuff/:map' component={Stuff} />
        <Route path='/stuff/create/:type' component={CreateStuff} />
      </Switch>
      <Switch>
        <Route exact path='/user' component={User} />
        <Route path='/user/login' component={Login} />
        <Route path='/user/register' component={Register} />
        <Route path='/user/verification' component={EmailVerify} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
