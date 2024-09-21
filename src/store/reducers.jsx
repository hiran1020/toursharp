
import { combineReducers } from 'redux';


const initialState = {};
const someReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  someReducer, // You can add more reducers here
});

export default rootReducer;
