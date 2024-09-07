import { combineReducers } from "redux";
import blog from "./blogReducers";
import user from "./userReducers";

// Combines multiple Redux reducers into a single root reducer for managing application state.
export default combineReducers({
  blog,
  user,
});
