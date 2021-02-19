import { combineReducers } from 'redux';
import auth from './auth';
import lists from './lists';
import tasks from './tasks';
import errors from './errors';
import messages from './messages';

const AllReducers = combineReducers({
  auth,
  lists,
  tasks,
  errors,
  messages,
});

export default AllReducers;
