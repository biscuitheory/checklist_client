import React, { useState } from 'react';
import axios from 'axios';

import WelcomeTopIcon from '../components/layout/WelcomeTopIcon';
import SignButton from '../components/buttons/SignButton';
import SignButtonDivider from '../components/buttons/SignButtonDivider';

import usePasswordToggle from '../components/customedhooks/usePasswordToggle';
import useForm from '../components/customedhooks/useForm';
import validate from '../components/validators/validateSignin';

const API = process.env.REACT_APP_DEV_API_URL;

const Signin = () => {
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  // const [redirect, setRedirect] = useState(false);

  const initialState = {
    email: '',
    password: '',
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    initialState,
    validate,
    submit
  );

  async function submit() {
    try {
      const res = await axios.post(`${API}signin`, {
        email: values.email,
        password: values.password,
      });

      if (res.status === 201) {
        console.log('signup success', res);
        // setRedirect(true);
      }
    } catch (err) {
      console.log('error from signup', err);
      setValues({
        ...values,
        errorMessage: err.message,
      });
    }
  }
  return (
    <>
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

export default Signin;
