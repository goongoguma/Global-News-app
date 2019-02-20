import { combineReducers } from "redux";
import authReducer from "./authReducer";
import newsReducer from "./newsReducer";

export default combineReducers({
  auth: authReducer,
  news: newsReducer
});
