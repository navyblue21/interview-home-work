import { combineReducers } from "redux";

import alert from "./alert.reducer";
import authentication from "./authentication.reducer";
import registration from "./registration.reducer";
import post from "./post.reducer";
import user from "./user.reducer";

const rootReducer = combineReducers({
  alert,
  authentication,
  registration,
  post,
  user,
});

export default rootReducer;
