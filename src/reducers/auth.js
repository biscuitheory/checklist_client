const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem('token') || {},
  user: {},
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNIN':
      localStorage.setItem('token', action.payload.data.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.data.token,
        user: action.payload.data.user,
      };
    case 'SIGNOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
    case 'LOAD_USER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.data,
      };
    default:
      return state;
  }
};

export default AuthReducer;
