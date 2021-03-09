import {
  GET_LISTS,
  GET_LISTSTASKS,
  ADD_LIST,
  EDIT_LIST,
  EDIT_LIST_TASK,
  DELETE_LIST,
  DELETE_LIST_TASK,
  CLEAR_LISTS,
  POST_ERROR,
} from '../actions/types';

const initialState = {
  lists: [],
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
        isLoading: false,
        errors: {},
      };
    case ADD_LIST:
    case EDIT_LIST:
      console.log('addedit list action.payload', action.payload);
      // console.log('addedit list action.payload', {
      //   lists: [
      //     ...state.lists.filter((list) => list.id !== action.payload.id),
      //     action.payload,
      //   ],
      // });
      // console.log('addedit list action.payload', {
      //   lists: [...action.payload.list, action.payload.Tasks],
      // });
      // console.log('addedit list action.payload', {
      //   lists: [...state.lists, action.payload],
      // });
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
    case EDIT_LIST_TASK:
      console.log('edit task action.payload', action.payload);
      return {
        ...state,
        lists: [
          ...state.lists.filter((list) => list.id !== action.payload.id),
          action.payload,
        ],
        isLoading: false,
        errors: {},
      };
    case DELETE_LIST:
      console.log('delete list action.payload', action.payload);
      return {
        ...state,
        lists: state.lists.filter((list) => list.id !== action.payload),
        errors: {},
      };
    case DELETE_LIST_TASK:
      console.log('delete task action.payload', action.payload);
      return {
        ...state,
        lists: [
          ...state.lists.filter((list) => list.id !== action.payload.id),
          action.payload,
        ],
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
