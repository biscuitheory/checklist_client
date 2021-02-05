/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-curly-newline */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({
  component: Component,
  isAuthenticated,
  ...children
}) => {
  return (
    <Route
      render={(props) =>
        isAuthenticated ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} {...children} />
        )
      }
    />
  );
};

export default PublicRoute;
