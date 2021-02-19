import axios from 'axios';
import { returnErrors } from './messages';
import { tokenConfig } from './auth';

import {
  GET_LISTS,
  ADD_LIST,
  EDIT_LIST,
  DELETE_LIST,
  CLEAR_LISTS,
  POST_ERROR,
} from './types';

const API = process.env.REACT_APP_DEV_API_URL;

// GET LISTS
export const getLists = () => async (dispatch, getState) => {
  axios
    .get(`${API}lists`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_LISTS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// ADD LIST
export const addList = () => async (dispatch) => {
  axios
    .post(`${API}lists`)
    .then((res) => {
      dispatch({
        type: ADD_LIST,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// EDIT LIST
export const editList = () => async (dispatch) => {
  axios
    .patch(`${API}lists`)
    .then((res) => {
      dispatch({
        type: ADD_LIST,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
