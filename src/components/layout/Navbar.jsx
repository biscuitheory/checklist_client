import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faThLarge } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
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
        <FontAwesomeIcon icon={faUserCircle} />
      </div>
    </div>
  );
};

export default Navbar;
