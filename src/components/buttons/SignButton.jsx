/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React from 'react';

const SignButton = ({ children, value, type }) => {
  return (
    // <button type="submit" className={`signbutton__${children}`}>
    <a href={`/${value}`} className="signbutton__link">
      <button type={`${type}`} className="signbutton" id={`${value}`}>
        {children}
      </button>
    </a>
  );
};

export default SignButton;
