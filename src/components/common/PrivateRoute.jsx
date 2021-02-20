/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  auth: { token, isLoading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (isLoading) {
        return <h2>Loading...</h2>;
      }
      if (!token) {
        console.log('user redirected cause token is', token);
        return <Redirect to="/signin" />;
      }
      console.log('user is authenticated!', token);
      return <Component {...props} />;
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
