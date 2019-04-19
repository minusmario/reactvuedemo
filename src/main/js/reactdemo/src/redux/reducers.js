import { combineReducers } from 'redux';

const demoReducer = (state = {
  userInput: '',
}, action) => {
  switch (action.type) {
    case 'SET_USER_INPUT':
      return {
        ...state,
        userInput: action.text,
      };
    default:
      return state;
  }
};

export default combineReducers({ demo: demoReducer });
