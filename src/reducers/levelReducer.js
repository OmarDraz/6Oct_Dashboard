
const levelReducer = (state = 1, action) => {
  switch (action.type) {
    case "LEVEL":
      return action.payload;
    default:
      return state;
  }
};
export default levelReducer;