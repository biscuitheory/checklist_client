/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signin } from '../actions/auth';

import usePasswordToggle from '../components/customedhooks/usePasswordToggle';
import useForm from '../components/customedhooks/useForm';
import validate from '../components/validators/validateSignin';

import WelcomeTopIcon from '../components/layout/WelcomeTopIcon';
import SignButton from '../components/buttons/SignButton';
import SignButtonDivider from '../components/buttons/SignButtonDivider';

const Signin = ({ signin, auth: { isAuthenticated, token } }) => {
  const [redirect, setRedirect] = useState(false);
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();

  const initialState = {
    email: '',
    password: '',
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    initialState,
    validate,
    submit
  );

  console.log('token or not?', token);

  async function submit() {
    signin(values);
    if (token) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="welcome__container">
      <div className="welcome__container-leftpanel">
        <WelcomeTopIcon />
        <div className="welcome__container-leftpanel-bottomhalf">
          <form onSubmit={handleSubmit} noValidate className="form__container">
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
              {/* <a href="/signup" className="signbutton__link"> */}
              <SignButton type="button" value="signup">
                Sign up
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

// Signin.propTypes = {
//   signin: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool,
// };

const mapStateToProps = (state) => ({
  // isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, { signin })(Signin);
