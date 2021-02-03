import { combineReducers } from 'redux';
import AuthReducer from './auth';

const AllReducers = combineReducers({
  AuthReducer,
});

export default AllReducers;
