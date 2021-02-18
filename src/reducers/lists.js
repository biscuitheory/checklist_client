import {
  GET_LISTS,
  ADD_LIST,
  EDIT_LIST,
  DELETE_LIST,
  CLEAR_LISTS,
  POST_ERROR,
} from '../actions/types';

const initialState = {
  lists: [],
  list: null,
  isLoading: false,
  errors: {},
};

const lists = (state = initialState, action) => {
  switch (action.type) {
    case GET_LISTS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
        errors: {},
      };
    case ADD_LIST:
    case EDIT_LIST:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false,
        errors: {},
      };
    case DELETE_LIST:
      return {
        ...state,
        list: state.list.filter((list) => list.id) !== action.payload,
        errors: {},
      };
    case CLEAR_LISTS:
      return {
        ...state,
        list: [],
        errors: {},
      };
    case POST_ERROR:
      return {
        ...state,
        isLoading: true,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default lists;
