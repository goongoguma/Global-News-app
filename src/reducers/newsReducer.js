export default (state = [], action) => {
  switch (action.type) {
    case "NEWS_HEADLINES":
      return { newsList: action.payload };
    default:
      return state;
  }
};
