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

const EditListModal = forwardRef(({ children }, ref) => {
  // console.log('these are the lists id', listId);
  const [display, setDisplay] = useState(false);

  // const history = useHistory();

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

  // async function submit() {
  //   deleteList(listId, history);
  // }

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
        <EditList />
      </div>,
      document.getElementById('modal-root')
    );
  }
  return null;
});

EditListModal.displayName = 'EditListModal';

export default EditListModal;
