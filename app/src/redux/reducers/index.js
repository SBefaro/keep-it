import { combineReducers } from "redux";
import authReducer from "./authReducer";
import notesReducer from "./notesReducer";

export default combineReducers({
  notes: notesReducer,
  authReducer
});