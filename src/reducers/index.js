import { combineReducers } from 'redux';
import auth from './auth';
import errors from './errors';
import messages from './messages';

const AllReducers = combineReducers({
  auth,
  errors,
  messages,
});

export default AllReducers;
