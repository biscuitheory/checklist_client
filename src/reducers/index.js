import { combineReducers } from 'redux';
import auth from './auth';
import lists from './lists';
import errors from './errors';
import messages from './messages';

const AllReducers = combineReducers({
  auth,
  lists,
  errors,
  messages,
});

export default AllReducers;
