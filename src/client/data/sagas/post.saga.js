import { call, put } from "redux-saga/effects";

import { postService } from "../services";
import { postConstants } from "../constants";

function* getPostSaga(payload) {
  const { GETPOST_SUCCESS, GETPOST_FAILURE } = postConstants;
  const success = posts => ({ type: GETPOST_SUCCESS, posts });
  const failure = message => ({ type: GETPOST_FAILURE, message });

  try {
    const response = yield call(postService.getPosts, payload);
    yield put(success(response));

    return response;
  } catch (error) {
    const errorMessages = error.response?.data.error;

    yield put(failure(errorMessages));

    return undefined;
  }
}

export { getPostSaga };
