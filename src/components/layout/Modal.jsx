/* eslint-disable consistent-return */
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';

const Modal = forwardRef(({ children }, ref) => {
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
      <div className="modal-wrapper">
        <div
          onClick={close}
          onKeyDown={close}
          role="presentation"
          className="modal-backdrop"
        />
        <div className="modal-box">{children}</div>
      </div>,
      document.getElementById('modal-root')
    );
  }
  return null;
});

Modal.displayName = 'Modal';

export default Modal;
