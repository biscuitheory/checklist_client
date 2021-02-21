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
export const editList = (listData) => async (dispatch) => {
  console.log('data list from edit list form', listData);

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify(listData);
  console.log('data from edit list form into body', body);

  axios
    .patch(`${API}lists`, body, config)
    .then((res) => {
      dispatch({
        type: EDIT_LIST,
        payload: res.data,
      });
      console.log('le nom de la liste est éditée !');
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE LIST
export const deleteList = (id) => async (dispatch, getState) => {
  console.log('rdv des lists id', id);
  axios
    .delete(`${API}lists`, id, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_LIST,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
