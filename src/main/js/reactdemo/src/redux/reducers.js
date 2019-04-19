import { combineReducers } from 'redux';
import demoEpics from '../observable/epics';
import { combineEpics } from 'redux-observable';

const demoReducer = (state = {
  userInput: '',
  listData: [],
  state: 0,
}, action) => {
  switch (action.type) {
    case 'SET_USER_INPUT':
      return {
        ...state,
        userInput: action.text,
      };
    case 'GET_LIST_DATA':
      return {
        ...state,
        state: 1,
      };
    case 'FILL_LIST_DATA':
      return {
        ...state,
        listData: action.listData,
        state: 2,
      };
    default:
      return state;
  }
};

export const rootEpic = combineEpics(demoEpics);
export const rootReducer = combineReducers({ demo: demoReducer });
