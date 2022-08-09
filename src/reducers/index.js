
import levelReducer from "./levelReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    levelReducer,
})

export default allReducers