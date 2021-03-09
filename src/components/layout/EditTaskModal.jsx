/* eslint-disable consistent-return */
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPenNib } from '@fortawesome/free-solid-svg-icons';

import EditTask from '../EditTask';

const EditTaskModal = forwardRef(({ task }, ref) => {
  console.log('test getState', task);
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
          <EditTask key={task.id} tasks={task.task} list={task.list} />
        </div>
      </div>,
      document.getElementById('modal-root')
    );
  }
  return null;
});

EditTaskModal.displayName = 'EditTaskModal';

export default EditTaskModal;
