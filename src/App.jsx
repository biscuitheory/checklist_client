import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Homepage from './pages/Homepage';

import './styles/App.scss';

function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={Homepage} />
      </Router>
    </>
  );
}

export default App;
