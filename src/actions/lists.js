import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import {
  GET_LISTS,
  GET_LISTSTASKS,
  ADD_LIST,
  EDIT_LIST,
  DELETE_LIST,
  CLEAR_LISTS,
  POST_ERROR,
} from './types';

const API = process.env.REACT_APP_DEV_API_URL;

// GET ALL THE LISTS OF AN USER
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

// GET ALL THE LISTS + CORRESPONDING TASKS OF AN USER
export const getListsTasks = (userId) => async (dispatch, getState) => {
  console.log('your eyes', userId);

  // const body = JSON.stringify(userId);
  // console.log('do you believe it', body);
  axios
    .post(`${API}liststasks`, { user_id: userId }, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_LISTSTASKS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// ADD LIST
export const addList = (data) => async (dispatch, getState) => {
  console.log('data from addlist form', data);

  // Request Body
  const body = JSON.stringify(data);
  console.log('data from addlist into body', body);

  axios
    .post(`${API}lists`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_LIST,
        payload: res.data,
      });
      dispatch(createMessage({ addList: 'List Added' }));
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
export const deleteList = (id, history) => async (dispatch, getState) => {
  console.log('rdv des lists id', id);
  axios
    .delete(`${API}lists`, id, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_LIST,
        payload: id,
      });
      history.push('/dashboard');
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
