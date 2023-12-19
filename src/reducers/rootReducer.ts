// src/reducers/index.ts
import { combineReducers } from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers as needed
});

export default rootReducer;
