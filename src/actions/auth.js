/* eslint-disable dot-notation */
// all HTTP REQ
import axios from 'axios';
import { returnErrors } from './messages';

import {
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT_SUCCESS,
  GET_ERRORS,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
} from './types';

const API = process.env.REACT_APP_DEV_API_URL;

// CHECK TOKEN & LOAD USER
export const loadUser = () => async (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  // Get token from state
  const { token } = getState().auth;
  // console.log('youpi', getState());
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

  axios
    .get(`${API}auth/user`, config)
    .then((res) => {
      dispatch({ type: USER_LOADED, payload: res.data });
    })
    .catch((err) => {
      // const errors = { msg: err.response.data, status: err.response.status };
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: errors,
      // });
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

//  SIGNIN USER
export const signin = (userData) => async (dispatch) => {
  console.log('cancoillotte', userData);
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify(userData);
  console.log('katchi', body);

  axios
    .post(`${API}signin`, body, config)
    .then((res) => {
      dispatch({ type: SIGNIN_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: SIGNIN_FAIL });
    });
};

//  SIGNOUT USER
export const signout = (email, password) => async (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ email, password });
  console.log('katchi', body);

  axios
    .post(`${API}signin`, body, config)
    .then((res) => {
      dispatch({ type: SIGNOUT_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: SIGNIN_FAIL });
    });
};
