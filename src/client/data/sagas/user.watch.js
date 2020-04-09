import { Action } from "redux";
import { Task } from "redux-saga";
import { take, fork, cancel, call, put } from "redux-saga/effects";

import { userService } from "../services";
import { userConstants } from "../constants";
import { loginSaga, registerSaga, getUserSaga } from "./user.saga";

const { logout } = userService;
const {
  LOGIN_REQUEST,
  LOGOUT,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  GETUSER_REQUEST,
} = userConstants;

function* watchLogin() {
  while (true) {
    const { user } = yield take(LOGIN_REQUEST);
    const loginTask: Task = yield fork(loginSaga, user);

    const action: Action = yield take([LOGOUT, LOGIN_FAILURE]);
    if (action.type === LOGOUT) {
      yield cancel(loginTask);
    }
    yield put({ type: LOGIN_FAILURE, message: loginTask.result() });
    yield call(logout);
  }
}

function* watchLogout() {
  yield take(LOGOUT);
  yield call(logout);
}

function* watchRegister() {
  while (true) {
    const { user } = yield take(REGISTER_REQUEST);
    yield call(registerSaga, user);
  }
}

function* watchGetUser() {
  const { id } = yield take(GETUSER_REQUEST);
  yield call(getUserSaga, id);
}

export { watchLogin, watchRegister, watchLogout, watchGetUser };
