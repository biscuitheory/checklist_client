import React from 'react';
import axios from 'axios';

import WelcomeTopIcon from '../components/layout/WelcomeTopIcon';
import SignButton from '../components/buttons/SignButton';
import SignButtonDivider from '../components/buttons/SignButtonDivider';

import usePasswordToggle from '../components/customedhooks/usePasswordToggle';
import useForm from '../components/customedhooks/useForm';
import validate from '../components/validators/validateSignup';

const API = process.env.REACT_APP_DEV_API_URL;

const Signup = () => {
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
    try {
      const res = await axios.post(`${API}signup`, {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
      });

      if (res.status === 201) {
        console.log('signup success', res);
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
