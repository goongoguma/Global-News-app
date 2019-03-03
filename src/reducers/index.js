import { combineReducers } from "redux";
import newsReducer from "./newsReducer";
import searchedReducer from "./searchedReducer";
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
  news: newsReducer,
  searchedNews: searchedReducer
});
