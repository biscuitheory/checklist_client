import {
  SIGNUP_SUCCESS,
  SIGNIN_SUCCESS,
  AUTH_FORM_FAIL,
  SIGNOUT_SUCCESS,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  token: localStorage.getItem('token'),
  user: {},
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: false,
        isLoading: false,
        token: action.payload.token,
      };
    case SIGNIN_SUCCESS:
      console.log('here is the token', action.payload.token);
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        token: action.payload.token,
      };
    case SIGNOUT_SUCCESS:
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        token: {},
        user: {},
      };
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case AUTH_ERROR:
    case AUTH_FORM_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: {},
        user: {},
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default auth;
