import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Stuff } from './components/Stuff';
import { NavBar } from './components/NavBar';
import { CreateStuff } from './components/CreateStuff';
import { Login } from './components/Login';
import { User } from './components/User';
import { Register } from './components/Register';

import './App.css';

function App() {
  return (
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
  );
}

export default App;
