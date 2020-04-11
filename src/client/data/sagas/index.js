import { all } from "redux-saga/effects";

import {
  watchLogin,
  watchRegister,
  // watchLogout,
  watchGetUser,
} from "./user.watch";
import { watchGetPosts } from "./post.watch";

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchRegister(),
    // watchLogout(),
    watchGetPosts(),
    watchGetUser(),
  ]);
}
