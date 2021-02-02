import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Board from './pages/Board';

import './styles/App.scss';

function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={Homepage} />
      </Router>
      <Router>
        <Route exact path="/signup" component={Signup} />
      </Router>
      <Router>
        <Route exact path="/signin" component={Signin} />
      </Router>
      <Router>
        <Route path="/board" component={Board} />
      </Router>
    </>
  );
}

export default App;
