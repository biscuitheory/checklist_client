/* eslint-disable camelcase */
import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import {
  GET_LISTS,
  GET_LISTSTASKS,
  ADD_LIST,
  EDIT_LIST,
  EDIT_LIST_TASK,
  EDIT_MOVED_LIST,
  DELETE_LIST,
  CLEAR_LISTS,
  POST_ERROR,
  DRAG_HAPPENED,
} from './types';

const API = process.env.REACT_APP_DEV_API_URL;

// GET ALL THE LISTS OF AN USER
export const getLists = (userId) => async (dispatch, getState) => {
  axios
    .post(`${API}onlylists`, { user_id: userId }, tokenConfig(getState))
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
export const addList = (list) => async (dispatch, getState) => {
  console.log('data from addlist form', list);

  // const { user_id, name, Tasks } = list;

  // console.log('userId', Tasks);

  // Request Body
  const body = JSON.stringify(list);
  // console.log('data from addlist into body', body);

  axios
    .post(`${API}lists`, body, tokenConfig(getState))
    .then((res) => {
      // console.log('dispatch addList', res.data);
      const newList = { ...res.data, Tasks: [] };
      // console.log('tututut', newList);
      dispatch(createMessage({ addList: 'List Added' }));
      dispatch({
        type: ADD_LIST,
        payload: newList,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// EDIT LIST
export const editList = (list) => (dispatch, getState) => {
  console.log('data list from edit list form', list);

  // Request Body
  const body = JSON.stringify(list);
  console.log('data from edit list form into body', body);

  axios
    .patch(`${API}lists`, body, tokenConfig(getState))
    .then((res) => {
      console.log('dispatch editList', res.data);
      const editedList = { ...res.data, Tasks: [] };
      console.log('tututut', editedList);
      dispatch(createMessage({ editList: 'List Updated' }));
      dispatch({
        type: EDIT_LIST,
        payload: editedList,
      });
    })
    .catch((err) =>
      // dispatch(returnErrors(err.response.data, err.response.status))
      console.log('editList', err)
    );
};

// DELETE LIST
export const deleteList = (id) => (dispatch, getState) => {
  const { token } = getState().auth;
  console.log('rdv de la list id', id);

  axios
    .delete(`${API}lists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { id },
    })
    .then((res) => {
      console.log('dispatch deleteList', res.data);
      dispatch(createMessage({ deleteList: 'List Deleted' }));
      dispatch({
        type: DELETE_LIST,
        payload: id,
      });
    })
    .catch((err) =>
      // dispatch(returnErrors(err.response.data, err.response.status))
      console.log('deleteList', err)
    );
};

export const sortItems = (data, list, lists) => (dispatch, getState) => {
  console.log('qeske le data', data);
  console.log('qeske le list', list);
  console.log('qeske les lists', lists);
  const {
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type,
  } = data;

  // const test = lists.splice(droppableIndexStart, 1);
  // // lists.splice(droppableIndexEnd, 0, ...test);

  // const rere = [...lists, test.lists.splice(droppableIndexEnd, 0, ...list)];

  // console.log('wakanda', rere);

  const { Tasks } = list;

  const body = JSON.stringify(list);
  console.log('data list from sortItems', body);

  // axios
  //   .patch(`${API}lists`, body, tokenConfig(getState))
  //   .then((res) => {
  //     console.log('res data sortList', res.data);
  //     const editedList = { ...res.data, Tasks };
  //     console.log('editedList', editedList);
  //     dispatch(createMessage({ editList: 'List Updated' }));
  //     // dispatch({
  //     //   type: EDIT_LIST_TASK,
  //     //   payload: editedList,
  //     // });
  //   })
  //   .catch((err) =>
  //     // dispatch(returnErrors(err.response.data, err.response.status))
  //     console.log('editList', err)
  //   );

  // if (type === 'task') {
  //   axios
  //     .patch(`${API}tasks`, draggableId, tokenConfig(getState))
  //     .then((res) => {
  //       const updatedTask = { ...list, Tasks: [...Tasks, res.data] };
  //       dispatch({
  //         type: EDIT_TASK,
  //         payload: res.data,
  //       });
  //       dispatch({
  //         type: EDIT_LIST,
  //         payload: updatedTask,
  //       });
  //       dispatch(createMessage({ addList: 'Task Updated' }));
  //     });
  // }
  // dispatch({
  //   type: DRAG_HAPPENED,
  //   payload: {
  //     droppableIdStart,
  //     droppableIdEnd,
  //     droppableIndexStart,
  //     droppableIndexEnd,
  //     draggableId,
  //     type,
  //   },
  // });
  // dispatch({
  //   type: EDIT_MOVED_LIST,
  //   payload: { draggableId, updatedList },
  // });
  dispatch({
    type: DRAG_HAPPENED,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
      type,
    },
  });
};
