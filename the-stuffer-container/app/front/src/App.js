import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Navigation, Footer, Home, StuffHub, StuffForm } from './components';


function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/stuffhub" exact component={() => <StuffHub />} />
          <Route path="/stuffform" exact component={() => <StuffForm />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;