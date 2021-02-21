/* eslint-disable no-shadow */
import React, { useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faThLarge } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import NavbarModal from './NavbarModal';
import { signout } from '../../actions/auth';

const Navbar = ({ signout }) => {
  const modalRef = useRef();

  const openModal = () => {
    modalRef.current.openModal();
  };

  const signOut = async (event) => {
    event.preventDefault();
    signout();
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
          <button onClick={signOut} type="submit">
            Sign out
          </button>
        </NavbarModal>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, { signout })(Navbar);
