import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './views/Home';
import { Stuff } from './views/Stuff';
import { NavBar } from './components/NavBar';
import { CreateStuff } from './views/CreateStuff';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Switch>
          <Route exact path='/stuff' component={Stuff} />
          <Route path='/stuff/create/:type' component={CreateStuff} />
        </Switch>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
