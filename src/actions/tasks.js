import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import {
  GET_TASKS,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  CLEAR_TASKS,
  POST_ERROR,
} from './types';

const API = process.env.REACT_APP_DEV_API_URL;

// GET ONLY TASKS FROM AN USER
export const getTasks = () => async (dispatch, getState) => {
  axios
    .get(`${API}tasks`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_TASKS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// ADD TASK
export const addTask = (data) => async (dispatch, getState) => {
  console.log('taskskssks', data);
  // Request Body
  const body = JSON.stringify(data);
  console.log('data from addlist into body', body);
  axios
    .post(`${API}tasks`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_TASK,
        payload: res.data,
      });
      dispatch(createMessage({ addList: 'Task Added' }));
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// EDIT TASK
export const editTask = (data) => async (dispatch, getState) => {
  console.log('taskskssks', data);
  // Request Body
  const body = JSON.stringify(data);
  console.log('data from editlist into body', body);
  axios
    .patch(`${API}tasks`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: EDIT_TASK,
        payload: res.data,
      });
      dispatch(createMessage({ addList: 'Task Updated' }));
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
