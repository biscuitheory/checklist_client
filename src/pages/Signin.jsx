/* eslint-disable no-shadow */
import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signin } from '../actions/auth';

import usePasswordToggle from '../components/customedhooks/usePasswordToggle';
import useForm from '../components/customedhooks/useForm';
import validate from '../components/validators/validateSignin';

import WelcomeTopIcon from '../components/layout/WelcomeTopIcon';
import SignButton from '../components/buttons/SignButton';
import SignButtonDivider from '../components/buttons/SignButtonDivider';

const Signin = ({ signin, auth: { isAuthenticated } }) => {
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();

  const initialState = {
    email: '',
    password: '',
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    initialState,
    validate,
    submit
  );

  async function submit() {
    signin(values);
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <>
      {/* {toHome ? <Redirect to="/dashboard" /> : null} */}
      <div className="welcome__container">
        <div className="welcome__container-leftpanel">
          <WelcomeTopIcon />
          <div className="welcome__container-leftpanel-bottomhalf">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="form__container"
            >
              <h2 className="form__container-title">Welcome back</h2>
              <label htmlFor="email" className="form__container-label">
                Email
                <span className="required">*</span>
                <div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="name@domain.com"
                    value={values.email}
                    onChange={handleChange}
                    className="form__container-input"
                  />
                </div>
                {errors.email && <p className="error">{errors.email}</p>}
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
                    value={values.password}
                    onChange={handleChange}
                    className="form__container-input"
                  />
                  <span className="password-toggle-icon">{ToggleIcon}</span>
                </div>
                {errors.password && <p className="error">{errors.password}</p>}
              </label>
              <span className="welcome__container-leftpanel-bottomhalf-buttons">
                <SignButton type="submit" value="signin">
                  Sign in
                </SignButton>
                <SignButtonDivider />
                <SignButton type="button" value="signup">
                  Sign up
                </SignButton>
              </span>
            </form>
          </div>
        </div>
        <div className="welcome__container-rightpanel" />
      </div>
    </>
  );
};

// Signin.propTypes = {
//   signin: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool,
// };

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signin })(Signin);
