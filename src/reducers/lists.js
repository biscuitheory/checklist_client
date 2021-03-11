/* eslint-disable no-shadow */
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
      } = action.payload;

      console.log('indexStart', droppableIndexStart);
      // if (type === 'list') {
      //   return state;
      // }
      // dragging lists around
      if (type === 'list') {
        const list = state.lists.splice(droppableIndexStart, 1);
        state.lists.splice(droppableIndexEnd, 0, ...list);
        console.log(
          'lili',
          ...state.lists.splice(droppableIndexEnd, 0, ...list)
        );
        return {
          ...state,
          // lists: [...state.lists.splice(droppableIndexEnd, 0, ...list)],
          lists: state.lists,
          isLoading: false,
          errors: {},
        };
      }

      if (droppableIdStart === droppableIdEnd) {
        const list = state[droppableIdStart];
        // const task = list.Tasks.splice(droppableIndexStart, 1);
        // list.Tasks.splice(droppableIndexEnd, 0, ...task);
        return { ...state, [droppableIdStart]: list };
      }

      // other list
      if (droppableIdStart !== droppableIdEnd) {
        // find the list where the drag happened
        const listStart = state[droppableIdStart];
        // pull out the card from this list
        // const task = listStart.tasks.splice(droppableIndexStart, 1);
        const listEnd = state[droppableIdEnd];

        // put the card in the new list
        // listEnd.tasks.splice(droppableIndexEnd, 0, ...task);
        return {
          ...state,
          [droppableIdStart]: listStart,
          [droppableIdEnd]: listEnd,
        };
      }
      // const newState = { ...state };

      // // dragging lists around
      // if (type === 'list') {
      //   const list = newState.lists.splice(droppableIndexStart, 1);
      //   newState.lists.splice(droppableIndexEnd, 0, ...list);
      //   return newState;
      // }

      // // same list
      // if (droppableIdStart === droppableIdEnd) {
      //   const list = newState.lists.find(
      //     (list) => droppableIdStart === list.id
      //   );
      //   const task = list.Tasks.splice(droppableIndexStart, 1);
      //   list.tasks.splice(droppableIndexEnd, 0, ...task);
      // }

      // // in the same list
      // if (droppableIdStart === droppableIdEnd) {
      //   const list = state[droppableIdStart];
      //   const task = list.tasks.splice(droppableIndexStart, 1);
      //   list.tasks.splice(droppableIndexEnd, 0, ...task);
      //   return { ...state, [droppableIdStart]: list };
      // }

      // // other list
      // if (droppableIdStart !== droppableIdEnd) {
      //   // find the list where the drag happened
      //   const listStart = state[droppableIdStart];
      //   // pull out the task from this list
      //   const task = listStart.tasks.splice(droppableIndexStart, 1);
      //   // find the list where the drag ended
      //   const listEnd = state[droppableIdEnd];

      //   // put the card in the new list
      //   listEnd.tasks.splice(droppableIndexEnd, 0, ...task);
      //   return {
      //     ...state,
      //     [droppableIdStart]: listStart,
      //     [droppableIdEnd]: listEnd,
      //   };
      // }
      return state;

      // const newState = [...state];

      // // in the same list
      // if (droppableIdStart === droppableIdEnd) {
      //   const newlist = state.find((list) => droppableIdStart === list.id);
      //   const task = newlist.tasks.splice(droppableIndexStart, 1);
      //   newlist.tasks.splice(droppableIndexEnd, 0, ...task);
      // }
      // return newState;
    }
    default:
      return state;
  }
};

export default lists;
