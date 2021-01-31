/* eslint-disable react/prop-types */
import React from 'react';

const SignButton = ({ children }) => {
  return (
    // <button type="submit" className={`signbutton__${children}`}>
    <button type="submit" id="signbutton" className={`signbutton__${children}`}>
      {children}
    </button>
  );
};

export default SignButton;
