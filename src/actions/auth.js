/* eslint-disable dot-notation */
// all HTTP REQ
import axios from 'axios';
import { returnErrors } from './messages';

import {
  SIGNUP_SUCCESS,
  SIGNIN_SUCCESS,
  AUTH_FORM_FAIL,
  SIGNOUT_SUCCESS,
  GET_ERRORS,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  CLEAR_LISTS,
} from './types';

const API = process.env.REACT_APP_DEV_API_URL;

// CHECK TOKEN & LOAD USER
export const loadUser = () => async (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get(`${API}auth/user`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: USER_LOADED, payload: res.data });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

// SIGNUP USER
export const signup = (userData, setToHome) => async (dispatch) => {
  console.log('data from signup form', userData);
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify(userData);
  console.log('data from signup form into body', body);

  axios
    .post(`${API}signup`, body, config)
    .then((res) => {
      dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
      setTimeout(() => setToHome(true), 1000);
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_FORM_FAIL });
    });
};

//  SIGNIN USER
export const signin = (userData) => (dispatch) => {
  console.log('data from signin form', userData);
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify(userData);
  console.log('data from signin form into body', body);

  axios
    .post(`${API}signin`, body, config)
    .then((res) => {
      dispatch({ type: SIGNIN_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_FORM_FAIL });
    });
};

// //  SIGNOUT USER
// export const signout = () => async (dispatch, getState) => {
//   axios
//     .post(`${API}signout`, null, tokenConfig(getState))
//     .then((res) => {
//       dispatch({ type: CLEAR_LISTS });
//       dispatch({ type: SIGNOUT_SUCCESS });
//     })
//     .catch((err) => {
//       dispatch(returnErrors(err.response.data, err.response.status));
//     });
// };

//  SIGNOUT USER
export const signout = () => async (dispatch) => {
  dispatch({ type: CLEAR_LISTS });
  dispatch({ type: SIGNOUT_SUCCESS });
};

// TOKEN CONFIG - HELPER FUNCTION
export const tokenConfig = (getState) => {
  // Get token from state
  const { token } = getState().auth;
  console.log('es el token', token);
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};
