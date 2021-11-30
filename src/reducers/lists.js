/* eslint-disable no-shadow */
// import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
import {
  GET_LISTS,
  GET_LISTSTASKS,
  ADD_LIST,
  EDIT_LIST,
  EDIT_MOVED_LIST,
  EDIT_LIST_TASK,
  DELETE_LIST,
  DELETE_LIST_TASK,
  CLEAR_LISTS,
  POST_ERROR,
  DRAG_HAPPENED,
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
        isLoading: false,
        errors: {},
      };
    case EDIT_MOVED_LIST: {
      // const { draggableId, updatedList } = action.payload;
      console.log('wesh la edit moved list', action.payload);
      const { draggableId, updatedList } = action.payload;
      const { id } = draggableId;
      return {
        ...state,
        lists: [...state.lists, updatedList],
        isLoading: false,
        errors: {},
      };
    }
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
    case DRAG_HAPPENED: {
      console.log('action payload drag', action.payload);
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId,
        type,
        // editedList,
      } = action.payload;

      // const newState = { ...state };

      // dragging lists around
      if (type === 'list') {
        // console.log('index start', state.lists.splice(droppableIndexStart, 1));
        const newlist = state.lists.splice(droppableIndexStart, 1);
        state.lists.splice(droppableIndexEnd, 0, ...newlist);
        return {
          ...state,
          lists: [...state.lists],
          isLoading: false,
          errors: {},
        };
        // const list = newState.lists.splice(droppableIndexStart, 1);
        // newState.lists.splice(droppableIndexEnd, 0, ...list);

        // console.log('wakanda', state.lists);
        // return newState;
        // return {
        //   ...state,
        //   // lists: [...state.lists],
        //   isLoading: false,
        //   errors: {},
        // };
      }

      // same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state.lists.find((list) => droppableIdStart === list.id);
        const task = list.Tasks.splice(droppableIndexStart, 1);
        list.Tasks.splice(droppableIndexEnd, 0, ...task);
        // return state;
        return {
          ...state,
          // lists: [
          //   ...state.lists.filter(
          //     (list) => list[droppableIdStart],
          //     action.payload.list
          //   ),
          //   action.payload,
          // ],
          // isLoading: false,
          // errors: {},
        };
      }

      // other list
      if (droppableIdStart !== droppableIdEnd) {
        // find the list where the drag happened
        const listStart = state.lists.find(
          (list) => droppableIdStart === list.id
        );
        // pull out the task from this list
        const task = listStart.Tasks.splice(droppableIndexStart, 1);
        // find the list where the drag ended
        const listEnd = state.lists.find((list) => droppableIdEnd === list.id);

        // put the card in the new list
        listEnd.Tasks.splice(droppableIndexEnd, 0, ...task);
      }

      // return newState;

      return {
        ...state,
        // [droppableIdStart]: listStart,
        // [droppableIdEnd]: listEnd,
      };
    }
    default:
      return state;
  }
};

export default lists;
