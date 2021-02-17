/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.isLoading) {
        return <h2>Loading...</h2>;
      }
      if (!auth.isAuthenticated) {
        console.log('wesh la mifa', auth);
        return <Redirect to="/" />;
      }
      console.log('tatayoyo', auth);
      return <Component {...props} />;
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
