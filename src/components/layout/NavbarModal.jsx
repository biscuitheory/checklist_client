/* eslint-disable consistent-return */
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';

const NavbarModal = forwardRef(({ children }, ref) => {
  const [display, setDisplay] = useState(true);

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
      <div className="navbar__modal-wrapper">
        <div
          onClick={close}
          onKeyDown={close}
          role="presentation"
          className="navbar__modal-backdrop"
        />
        <div className="navbar__modal-box">{children}</div>
      </div>,
      document.getElementById('modal-root')
    );
  }
  return null;
});

NavbarModal.displayName = 'NavbarModal';

export default NavbarModal;
