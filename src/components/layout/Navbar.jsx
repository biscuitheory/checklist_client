import React, { useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faThLarge } from '@fortawesome/free-solid-svg-icons';
import NavbarModal from './NavbarModal';

const Navbar = () => {
  const modalRef = useRef();

  const openModal = () => {
    modalRef.current.openModal();
  };
  return (
    <div className="navbar__container">
      <div className="navbar__container-board">
        <FontAwesomeIcon icon={faThLarge} />
        <h2>Users board</h2>
      </div>
      <a href="/" className="navbar__container-app">
        <FontAwesomeIcon icon={faClipboard} />
      </a>
      <div className="navbar__container-user">
        <button
          onClick={openModal}
          type="button"
          className="navbar__container-user-button"
        >
          <FontAwesomeIcon icon={faUserCircle} />
        </button>
        <NavbarModal ref={modalRef}>
          <button type="submit">Sign out</button>
        </NavbarModal>
      </div>
    </div>
  );
};

export default Navbar;
