/* eslint-disable no-shadow */
/* eslint-disable no-lone-blocks */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Textarea from 'react-textarea-autosize';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import useForm from '../customedhooks/useForm';
import validate from '../validators/validateAddItem';
// import { addList } from '../../actions/lists';
import { addTask } from '../../actions/tasks';

const AddTaskButton = ({
  listId,
  text,
  children,
  // addList,
  addTask,
  auth,
  messages,
}) => {
  const [formOpen, setFormOpen] = useState(false);
  // console.log('eeasy', messages);

  const open = () => {
    setFormOpen(true);
  };

  const close = () => {
    setFormOpen(false);
  };

  const buttonTextOpacity = text === 'list' ? 1 : 0.5;
  const buttonTextColor = text === 'list' ? 'white' : 'inherit';
  const buttonTextBackground = text === 'list' ? '#eeeeee' : 'inherit';

  const placeholder =
    text === 'list' ? 'Enter new list name' : 'Enter new task name';

  const buttonTitle = text === 'list' ? 'Add List' : 'Add Task';

  // const valueButton = text === 'list' ? 'addList' : 'addTask';

  const initialState = {
    name: '',
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    initialState,
    validate,
    submit
  );

  console.log('un', auth.user.id);
  console.log('deux', values.name);
  console.log('trois', listId);
  // const submitAction =
  //   text === 'list'
  //     ? addList({ user_id: auth.user.id, name: values.name })
  //     : addTask({
  //         user_id: auth.user.id,
  //         name: values.name,
  //         description: {},
  //         priority_id: 3,
  //         list_id: listId,
  //       });

  // {
  //   text === 'list'
  //     ? async function submit() {
  //         addList({ user_id: auth.user.id, name: values.name });
  //       }
  //     : async function submit() {
  //         addTask({
  //           user_id: auth.user.id,
  //           name: values.name,
  //           description: {},
  //           priority_id: 3,
  //           list_id: listId,
  //         });
  //       };
  // }

  // async function submit() {
  //   {
  //     text === 'list'
  //       ? addList({ user_id: auth.user.id, name: values.name })
  //       : addTask({
  //           user_id: auth.user.id,
  //           name: values.name,
  //           description: {},
  //           priority_id: 3,
  //           list_id: listId,
  //         });
  //   }
  // }

  async function submit() {
    addTask({
      user_id: auth.user.id,
      name: values.name,
      description: 'Description à compléter',
      priority_id: 3,
      list_id: listId,
    });
  }

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div
      style={{
        opacity: buttonTextOpacity,
        color: buttonTextColor,
        background: buttonTextBackground,
      }}
      className="add-item-background"
    >
      <div className="add-item-container">
        {formOpen ? (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="add-item-container-form"
          >
            <Textarea
              placeholder={placeholder}
              autoFocus
              className="add-item-container-form-input"
              onChange={handleChange}
              // onBlur={close}
              value={values.name}
              name="name"
              id="id"
              type="text"
            />
            {errors.name && <p className="error">{errors.name}</p>}
            <button
              type="submit"
              value="addTask"
              className="add-item-form-button"
              onClick={() => refreshPage()}
            >
              {buttonTitle}
            </button>
            <FontAwesomeIcon
              className="add-item-container-form-cross"
              icon={faTimes}
              onMouseDown={close}
            />
          </form>
        ) : (
          <div className="add-item-button">
            <button className="add-item-buttons" type="button" onClick={open}>
              <FontAwesomeIcon icon={faPlus} />
              &nbsp; Add a new&nbsp;
              {children}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  messages: state.messages.state,
});

export default connect(mapStateToProps, { addTask })(AddTaskButton);
