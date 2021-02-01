import React from 'react';

import WelcomeTopIcon from '../components/layout/WelcomeTopIcon';
import SignButton from '../components/buttons/SignButton';
import SignButtonDivider from '../components/buttons/SignButtonDivider';

import usePasswordToggle from '../components/customedhooks/usePasswordToggle';

const Signup = () => {
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();

  return (
    <div className="welcome__container">
      <div className="welcome__container-leftpanel">
        <WelcomeTopIcon />
        <div className="welcome__container-leftpanel-bottomhalf">
          <form className="form__container">
            <h2 className="form__container-title">Create an account</h2>
            <label htmlFor="firstname" className="form__container-label">
              Firstname
              <span className="required">*</span>
              <div>
                <input
                  id="firstname"
                  type="firstname"
                  name="firstname"
                  placeholder="firstname"
                  className="form__container-input"
                />
              </div>
            </label>
            <label htmlFor="lastname" className="form__container-label">
              Lastname
              <span className="required">*</span>
              <div>
                <input
                  id="lastname"
                  type="lastname"
                  name="lastname"
                  placeholder="lastname"
                  className="form__container-input"
                />
              </div>
            </label>
            <label htmlFor="email" className="form__container-label">
              Email
              <span className="required">*</span>
              <div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@domain.com"
                  className="form__container-input"
                />
              </div>
            </label>
            <label htmlFor="password" className="form__container-label">
              Password
              <span className="required">*</span>
              <div>
                <input
                  id="password"
                  type={PasswordInputType}
                  name="password"
                  placeholder="at least 8 characters"
                  className="form__container-input"
                />
                <span className="password-toggle-icon">{ToggleIcon}</span>
              </div>
            </label>
            <span className="welcome__container-leftpanel-bottomhalf-buttons">
              <SignButton value="signup">Sign up</SignButton>
              <SignButtonDivider />
              <SignButton value="signin">Sign in</SignButton>
            </span>
          </form>
        </div>
      </div>
      <div className="welcome__container-rightpanel" />
    </div>
  );
};

export default Signup;
