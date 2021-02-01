/* eslint-disable react/prop-types */
import React from 'react';

const SignButton = ({ children, value }) => {
  return (
    // <button type="submit" className={`signbutton__${children}`}>
    <a href={`/${value}`} className="signbutton__link">
      <button type="button" className="signbutton" id={`${value}`}>
        {children}
      </button>
    </a>
  );
};

export default SignButton;
