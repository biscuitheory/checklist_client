import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
// import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import store from './store';
// import { auth } from './actions/index';
import { loadUser } from './actions/auth';

import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import Alerts from './components/layout/Alerts';
// import PublicRoute from './components/common/PublicRoute';
import PrivateRoute from './components/common/PrivateRoute';

import './styles/App.scss';

// const API = process.env.REACT_APP_DEV_API_URL;

const alertOptions = {
  timeout: 3000,
  position: 'top center',
};

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
          {/* <Alerts /> */}
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </AlertProvider>
    </Provider>
  );
}

export default App;
