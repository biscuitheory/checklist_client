/* eslint-disable consistent-return */
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

const EditListModal = forwardRef(({ children }, ref) => {
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
          <button type="submit" className="delete-item-button">
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

export default EditListModal;
