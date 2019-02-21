import { combineReducers } from "redux";
import newsReducer from "./newsReducer";
import searchedReducer from "./searchedReducer";

export default combineReducers({
  news: newsReducer,
  searchedNews: searchedReducer
});
