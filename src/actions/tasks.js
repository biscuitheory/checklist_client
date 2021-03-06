/* eslint-disable no-shadow */
import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import {
  EDIT_LIST,
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
// export const addTask = (task) => async (dispatch, getState) => {
//   console.log('data from addtaskform', task);
//   // Request Body
//   const body = JSON.stringify(task);
//   console.log('data from addtask into body', body);
//   axios
//     .post(`${API}tasks`, body, tokenConfig(getState))
//     .then((res) => {
//       console.log('dispatch addTask', res.data);
//       // dispatch({
//       //   type: ADD_TASK,
//       //   payload: res.data,
//       // });
//       dispatch(createMessage({ addList: 'Task Added' }));
//     })
//     .catch((err) =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };

export const addTask = (task, list) => async (dispatch, getState) => {
  const { Tasks } = list;
  console.log('data from addtaskform', task);
  console.log('list from addtaskfrom', list);
  // Request Body
  const body = JSON.stringify(task);
  console.log('data from addtask into body', body);
  axios
    .post(`${API}tasks`, body, tokenConfig(getState))
    .then((res) => {
      console.log('dispatch addTask', res.data);
      // const taskie = {
      //   Tasks: { ...Tasks.filter((task) => task.id !== res.data), ...res.data },
      // };
      // const taskie = {
      //   Tasks: { ...Tasks.filter((task) => task.id !== res.data), ...res.data },
      // };
      const taskie = {
        Tasks: [...Tasks, res.data],
      };
      const newTask = { ...list, taskie };
      // const newTask = { list, Tasks: { ...res.data } };
      console.log('test newTask', newTask);
      dispatch({
        type: ADD_TASK,
        payload: res.data,
      });
      dispatch({
        type: EDIT_LIST,
        payload: newTask,
      });
      dispatch(createMessage({ addList: 'Task Added' }));
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// EDIT TASK
export const editTask = (data) => async (dispatch, getState) => {
  // Request Body
  const body = JSON.stringify(data);

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
