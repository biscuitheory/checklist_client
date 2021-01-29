import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';

const Homepage = () => {
  return (
    <div className="welcome__container">
      <div className="welcome__container-leftpanel">
        <FontAwesomeIcon icon={faClipboard} />
      </div>
      <div className="welcome__container-rightpanel" />
    </div>
  );
};

export default Homepage;
