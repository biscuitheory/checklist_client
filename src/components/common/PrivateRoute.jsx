/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  auth: { token, isAuthenticated, isLoading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (isLoading) {
        return <h2>Loading...</h2>;
      }
      if (!isAuthenticated) {
        console.log('user redirected cause is not auth', isAuthenticated);
        return <Redirect to="/signin" />;
      }
      console.log('user has a token!', token);
      return <Component {...props} />;
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
