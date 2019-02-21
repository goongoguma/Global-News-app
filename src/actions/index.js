import api from "../api/api";
import axios from "axios";

export const countryNews = country => {
  return async dispatch => {
    const res = await api.get(
      `/top-headlines?country=${country}&apiKey=8860cc5a37614d068811ab16e6c57978`
    );
    dispatch({
      type: "NEWS_HEADLINES",
      payload: res.data
    });
  };
};

export const searchedNews = keyword => {
  return async dispatch => {
    const res = await api.get(
      `/everything?q=${keyword}&apiKey=8860cc5a37614d068811ab16e6c57978`
    );
    dispatch({
      type: "SEARCHED_NEWS",
      payload: res.data
    });
  };
};
