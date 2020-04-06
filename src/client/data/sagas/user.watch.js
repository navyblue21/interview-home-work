import { Action } from "redux";
import { Task } from "redux-saga";
import { take, fork, cancel, call } from "redux-saga/effects";

import { userService } from "../services";
import { userConstants } from "../constants";
import { loginSaga, registerSaga, getUserSaga } from "./user.saga";

function* watchLogin() {
  const { logout } = userService;
  const { LOGIN_REQUEST, LOGOUT, LOGIN_FAILURE } = userConstants;

  while (true) {
    const { user } = yield take(LOGIN_REQUEST);
    const loginTask: Task = yield fork(loginSaga, user);

    const action: Action = yield take([LOGOUT, LOGIN_FAILURE]);
    if (action.type === LOGOUT) {
      yield cancel(loginTask);
    }
    yield call(logout);
  }
}

function* watchLogout() {
  const { LOGOUT } = userConstants;
  const { logout } = userService;

  yield take(LOGOUT);
  yield call(logout);
}

function* watchRegister() {
  const { REGISTER_REQUEST } = userConstants;

  while (true) {
    const { user } = yield take(REGISTER_REQUEST);
    yield call(registerSaga, user);
  }
}

function* watchGetUser() {
  const { GETUSER_REQUEST } = userConstants;
  const { id } = take(GETUSER_REQUEST);
  yield call(getUserSaga, id);
}

export { watchLogin, watchRegister, watchLogout, watchGetUser };
