import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';

import SignButton from '../components/buttons/SignButton';

const Homepage = () => {
  return (
    <div className="welcome__container">
      <div className="welcome__container-leftpanel">
        <div className="welcome__container-leftpanel-tophalf">
          <FontAwesomeIcon
            className="welcome__container-leftpanel-tophalf-icon"
            icon={faClipboard}
          />
        </div>
        <div className="welcome__container-leftpanel-bottomhalf">
          <h1>Todolist</h1>
          <p>
            Simpler than Trello and way more easier to use!
            <br />
            Create and organise your tasks in a few seconds, easy as pie.
            <br />
            Sign up for a free account
          </p>
          <span className="welcome__container-leftpanel-bottomhalf-buttons">
            <SignButton>signin</SignButton>
            <SignButton>signup</SignButton>
          </span>
        </div>
      </div>
      <div className="welcome__container-rightpanel" />
    </div>
  );
};

export default Homepage;
