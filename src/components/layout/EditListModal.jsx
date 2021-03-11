/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import React, { useState, forwardRef, useImperativeHandle } from 'react';
// import { useHistory } from 'react-router-dom';
import ReactDOM from 'react-dom';
// import { connect } from 'react-redux';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import EditList from '../EditList';
// import { deleteList } from '../../actions/lists';

const EditListModal = forwardRef(({ listId }, ref) => {
  // console.log('pouuit', listId);
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

  // if () {
  //   return <Redirect to="/dashboard" />;
  // }
  if (display) {
    return ReactDOM.createPortal(
      <div className="editlist-modal-wrapper">
        <div
          onClick={close}
          onKeyDown={close}
          role="presentation"
          className="editlist-modal-backdrop"
        />
        <EditList listId={listId} />
      </div>,
      document.getElementById('modal-root')
    );
  }
  return null;
});

EditListModal.displayName = 'EditListModal';

export default EditListModal;
