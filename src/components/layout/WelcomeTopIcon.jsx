import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';

const WelcomeTopIcon = () => {
  return (
    <div className="welcome__container-leftpanel-tophalf">
      <a href="/">
        <FontAwesomeIcon
          className="welcome__container-leftpanel-tophalf-icon"
          icon={faClipboard}
        />
      </a>
    </div>
  );
};

export default WelcomeTopIcon;
