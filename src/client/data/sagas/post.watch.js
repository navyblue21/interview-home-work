import { take, call } from "redux-saga/effects";

import { postConstants } from "../constants";
import { getPostSaga } from "./post.saga";

function* watchGetPosts() {
  const { GETPOST_REQUEST } = postConstants;
  const { id } = yield take(GETPOST_REQUEST);
  yield call(getPostSaga, id);
}

export { watchGetPosts };
