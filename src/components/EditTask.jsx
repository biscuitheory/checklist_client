/* eslint-disable consistent-return */
/* eslint-disable no-constant-condition */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import useForm from './customedhooks/useForm';
import validate from './validators/validateEditTask';
import { editTask, deleteTask } from '../actions/tasks';

const EditTask = ({ tasks, list, auth, editTask, deleteTask, messages }) => {
  console.log('user', auth);
  console.log('full list', list);
  console.log('full tasks', tasks);
  console.log('lissst id', tasks.list_id);
  console.log('taesks', tasks.name);
  const initialState = {
    id: '' ? '' : tasks.id,
    name: '' ? '' : tasks.name,
    description: '' ? '' : tasks.description,
    priority_id: '' ? '' : tasks.priority_id,
    list_id: '' ? '' : tasks.list_id,
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    initialState,
    validate,
    submit
  );

  async function submit() {
    editTask(
      {
        user_id: auth.user.id,
        id: tasks.id,
        name: values.name,
        description: values.description,
        priority_id: values.priority_id,
        list_id: tasks.list_id,
      },
      list
    );
  }

  async function submitDelete() {
    deleteTask(tasks.id, tasks, list);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="edittask-modal-box-body"
      >
        <label htmlFor="name">
          Task name:
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={values.name || ''}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </label>
        <label htmlFor="description">
          Task description:
          <textarea
            type="text"
            name="description"
            id="description"
            className="edittask-modal-box-body-form-box"
            onChange={handleChange}
            value={values.description || ''}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </label>
        <label htmlFor="priority">
          Priority:
          <input
            type="text"
            name="priority"
            id="priority"
            onChange={handleChange}
            value={values.priority_id || ''}
          />
          {errors.priority_id && <p className="error">{errors.priority_id}</p>}
        </label>
        <button type="submit" value="editTask" className="edit-items-buttons">
          <p>Update the task</p>
        </button>
      </form>
      <div className="edittask-modal-box-body-delete">
        <span className="edittask-modal-box-body-delete-title">
          <FontAwesomeIcon icon={faTrashAlt} />
          <h3>Delete Task</h3>
        </span>
        <p>Or do you really want to delete the task permanently?</p>
        <button
          type="submit"
          className="delete-item-button"
          onClick={submitDelete}
        >
          <p>Delete the task</p>
        </button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  messages: state.messages.state,
});

export default connect(mapStateToProps, { editTask, deleteTask })(EditTask);
