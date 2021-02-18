/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';

import usePasswordToggle from '../components/customedhooks/usePasswordToggle';
import useForm from '../components/customedhooks/useForm';
import validate from '../components/validators/validateSignup';
import WelcomeTopIcon from '../components/layout/WelcomeTopIcon';
import SignButton from '../components/buttons/SignButton';
import SignButtonDivider from '../components/buttons/SignButtonDivider';

const Signup = ({ signup, auth: { isAuthenticated } }) => {
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();

  const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    initialState,
    validate,
    submit
  );

  async function submit() {
    signup(values);
  }

  if (isAuthenticated) {
    return <Redirect to="/signin" />;
  }
  return (
    <div className="welcome__container">
      <div className="welcome__container-leftpanel">
        <WelcomeTopIcon />
        <div className="welcome__container-leftpanel-bottomhalf">
          <form onSubmit={handleSubmit} noValidate className="form__container">
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
                  value={values.firstname}
                  onChange={handleChange}
                  className="form__container-input"
                />
              </div>
              {errors.firstname && <p className="error">{errors.firstname}</p>}
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
                  value={values.lastname}
                  onChange={handleChange}
                  className="form__container-input"
                />
              </div>
              {errors.lastname && <p className="error">{errors.lastname}</p>}
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
              <SignButton type="submit" value="signup">
                Sign up
              </SignButton>
              <SignButtonDivider />
              {/* <a href="/signin" className="signbutton__link"> */}
              <SignButton type="button" value="signin">
                Sign in
              </SignButton>
              {/* </a> */}
            </span>
          </form>
        </div>
      </div>
      <div className="welcome__container-rightpanel" />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signup })(Signup);
