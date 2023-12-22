// src/reducers/index.ts
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import accountReducer from './accountRecuder';

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
});

export default rootReducer;
