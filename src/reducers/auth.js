import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  // SIGNIN_SUCCESS,
  // SIGNIN_FAIL,
  SIGNOUT_SUCCESS,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  token: localStorage.getItem('token') || {},
  user: {},
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      console.log('here is the token', action.payload.token);
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        token: action.payload.token,
        // user: action.payload.data.user,
      };
    case SIGNOUT_SUCCESS:
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        token: null,
        user: null,
      };
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case AUTH_ERROR:
    case AUTH_FAIL:
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
