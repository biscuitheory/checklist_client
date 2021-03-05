import {
  GET_LISTS,
  GET_LISTSTASKS,
  ADD_LIST,
  EDIT_LIST,
  DELETE_LIST,
  CLEAR_LISTS,
  POST_ERROR,
} from '../actions/types';

const initialState = {
  lists: [],
  // onlyLists: [],
  isLoading: false,
  errors: {},
};

const lists = (state = initialState, action) => {
  switch (action.type) {
    case GET_LISTS:
      return {
        ...state,
        onlyLists: action.payload,
        isLoading: false,
        errors: {},
      };
    case GET_LISTSTASKS:
      return {
        ...state,
        lists: action.payload,
        // onlyLists: action.payload,
        isLoading: false,
        errors: {},
      };
    case ADD_LIST:
    case EDIT_LIST:
      console.log('kebab', state.onlyLists);
      console.log('falafel', action.payload);
      console.log('wakanda', {
        lists: [
          ...state.lists.filter((list) => list.id !== action.payload.id),
          action.payload,
        ],
      });
      return {
        ...state,
        lists: [...state.lists, action.payload],
        // lists: [
        //   ...state.lists.filter((list) => list.id !== action.payload.id),
        //   action.payload,
        // ],
        isLoading: false,
        errors: {},
      };
    case DELETE_LIST:
      console.log('object', state.lists);
      return {
        ...state,
        lists: state.lists.filter((list) => list.id !== action.payload),
        errors: {},
      };
    case CLEAR_LISTS:
      return {
        ...state,
        lists: [],
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
