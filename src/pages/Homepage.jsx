import React from 'react';

import WelcomeTopIcon from '../components/layout/WelcomeTopIcon';
import SignButton from '../components/buttons/SignButton';

const Homepage = () => {
  return (
    <div className="welcome__container">
      <div className="welcome__container-leftpanel">
        <WelcomeTopIcon />
        <div className="welcome__container-leftpanel-bottomhalf">
          <h1>Todolist</h1>
          <p>
            Simpler than Trello and way more easier to use!
            <br />
            Create and organise your tasks in a few seconds, easy as pie.
            <br />
            Sign up for an account, it is completely free !
          </p>
          <span className="welcome__container-leftpanel-bottomhalf-buttons">
            <a href="/signin" className="signbutton__link">
              <SignButton value="signin">Sign in</SignButton>
            </a>
            <a href="/signup" className="signbutton__link">
              <SignButton value="signup">Sign up</SignButton>
            </a>
          </span>
        </div>
      </div>
      <div className="welcome__container-rightpanel" />
    </div>
  );
};

export default Homepage;
