// src/reducers/index.ts
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import accountReducer from "./accountReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  post: postReducer,
});

export default rootReducer;
