import {
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
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
    case SIGNIN_SUCCESS:
      // localStorage.setItem('token', action.payload.data.token);
      console.log('wesh papi', action);
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        // token: action.payload.data.token,
        // user: action.payload.data.user,
      };
    case SIGNOUT_SUCCESS:
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        token: null,
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
    case SIGNIN_FAIL:
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
