/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { deleteList } from '../../actions/lists';

const EditListModal = forwardRef(({ deleteList, listId }, ref) => {
  const [redirect, setRedirect] = useState(false);
  console.log('these are the lists id', listId);
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

  async function submit() {
    deleteList(listId);
    setRedirect(true);
  }

  if (redirect) {
    return <Redirect to="/dashboard" />;
  }
  if (display) {
    return ReactDOM.createPortal(
      <div className="editlist-modal-wrapper">
        <div
          onClick={close}
          onKeyDown={close}
          role="presentation"
          className="editlist-modal-backdrop"
        />
        <div className="editlist-modal-box">
          <FontAwesomeIcon icon={faTrashAlt} />
          <p>Do you really want to delete the list?</p>
          <button type="submit" className="delete-item-button" onClick={submit}>
            Delete the list
          </button>
        </div>
      </div>,
      document.getElementById('modal-root')
    );
  }
  return null;
});

EditListModal.displayName = 'EditListModal';

const mapStateToProps = (state) => ({
  tasks: state.tasks.tasks,
});

export default connect(mapStateToProps, { deleteList })(EditListModal);
