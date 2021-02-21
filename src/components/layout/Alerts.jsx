import React, { useEffect } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';

const Alerts = ({ error, alert, message }) => {
  console.log('titit', error);
  if (error) {
    if (error.msg) alert.error('There is an error');
  }
  // useEffect(() => {
  //   alert.show('Alert Works');
  // }, []);
  return <></>;
};
const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
