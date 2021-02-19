import axios from 'axios';
import { returnErrors } from './messages';
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

// GET TASKS
export const getTasks = () => async (dispatch, getState) => {
  // console.log('your eyes', listId);

  // const body = JSON.parse(listId);
  // console.log('do you believe it', body);
  axios
    .get(`${API}listasks`, tokenConfig(getState))
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
export const addTask = () => async (dispatch) => {
  axios
    .post(`${API}task`)
    .then((res) => {
      dispatch({
        type: ADD_TASK,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
