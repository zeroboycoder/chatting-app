import { combineReducers } from "redux";
import message from "./message";
import { reducer as room } from "./room";
import { reducer as auth } from "./auth";
import { reducer as flash } from "./flash";

export default combineReducers({
   room,
   message,
   auth,
   flash,
});
