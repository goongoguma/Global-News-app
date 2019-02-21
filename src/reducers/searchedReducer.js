export default (state = [], action) => {
  switch (action.type) {
    case "SEARCHED_NEWS":
      return { newsList: action.payload };
    default:
      return state;
  }
};
