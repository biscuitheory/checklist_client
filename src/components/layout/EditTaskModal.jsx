/* eslint-disable consistent-return */
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faTimes, faPenNib } from '@fortawesome/free-solid-svg-icons';

const EditTaskModal = forwardRef(({ children }, ref) => {
  const [display, setDisplay] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
      close: () => close(),
    };
  });

  const open = () => {
    setDisplay(true);
  };

  const close = () => {
    setDisplay(false);
  };

  if (display) {
    return ReactDOM.createPortal(
      <div className="edittask-modal-wrapper">
        <div
          onClick={close}
          onKeyDown={close}
          role="presentation"
          className="edittask-modal-backdrop"
        />
        <div className="edittask-modal-box">
          <div className="edittask-modal-box-header">
            <span className="edittask-modal-box-header-title">
              <FontAwesomeIcon icon={faPenNib} />
              <h3>Edit Task</h3>
            </span>
            <span className="edittask-modal-box-header-cross">
              <FontAwesomeIcon
                className="add-item-form-cross"
                icon={faTimes}
                onClick={close}
              />
            </span>
          </div>
          <div className="edittask-modal-box-body">
            <label htmlFor="name">
              Task name:
              <input type="text" id="name" />
            </label>
            <label htmlFor="description">
              Task description:
              <textarea
                type="text"
                id="description"
                className="edittask-modal-box-body-form-box"
              />
            </label>
            <button type="submit" className="edit-items-buttons">
              <p>Update the task</p>
            </button>
          </div>
          <div className="edittask-modal-box-body-delete">
            <span className="edittask-modal-box-body-delete-title">
              <FontAwesomeIcon icon={faTrashAlt} />
              <h3>Delete Task</h3>
            </span>
            <p>Or do you really want to delete the task permanently?</p>
            <button type="submit" className="delete-item-button">
              <p>Delete the list</p>
            </button>
          </div>
        </div>
      </div>,
      document.getElementById('modal-root')
    );
  }
  return null;
});

EditTaskModal.displayName = 'EditTaskModal';

export default EditTaskModal;
