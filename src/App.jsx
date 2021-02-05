import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loaduser } from './actions/index';

import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Board from './pages/Board';
// import PublicRoute from './components/common/PublicRoute';
// import PrivateRoute from './components/common/PrivateRoute';

import './styles/App.scss';

const API = process.env.REACT_APP_DEV_API_URL;

function App() {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = await axios.get(`${API}user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(loaduser(user));
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route path="/board" component={Board} />
      </Switch>
    </Router>
  );
}

export default App;
