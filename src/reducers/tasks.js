import {
  GET_TASKS,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  CLEAR_TASKS,
  POST_ERROR,
} from '../actions/types';

const initialState = {
  tasks: [],
  isLoading: false,
  errors: {},
};

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        isLoading: false,
        errors: {},
      };
    case ADD_TASK:
    case EDIT_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        isLoading: false,
        errors: {},
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        errors: {},
      };
    case CLEAR_TASKS:
      return {
        ...state,
        tasks: [],
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

export default tasks;
