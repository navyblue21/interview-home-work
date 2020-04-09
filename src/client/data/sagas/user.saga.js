import { put, call, delay } from "redux-saga/effects";
import { userService } from "../services";
import { alertActions } from "../actions";
import { userConstants } from "../constants";
import history from "../../helpers/history";

function authentication(actionCreator: Object, serviceMethod: Function) {
  const { success, failure } = actionCreator;

  return function* authenticationSaga(payload: Object) {
    yield delay(500);

    try {
      const response = yield call(serviceMethod, payload);
      yield put(success(response));

      yield delay(500);
      yield put(alertActions.success("Successfully!"));

      yield delay(300);
      history.push("");

      return response;
    } catch (error) {
      const errorMessages = error?.response?.data?.error;

      yield put(failure(errorMessages));
      yield put(alertActions.error(errorMessages));

      return undefined;
    }
  };
}

const {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} = userConstants;
const loginActionCreator = {
  success: user => ({ type: LOGIN_SUCCESS, user }),
  failure: error => ({ type: LOGIN_FAILURE, message: error }),
};
const registerActionCreator = {
  success: user => ({ type: REGISTER_SUCCESS, user }),
  failure: error => ({ type: REGISTER_FAILURE, message: error }),
};
const { login, register } = userService;

const loginSaga = authentication(loginActionCreator, login);
const registerSaga = authentication(registerActionCreator, register);

function* getUserSaga(payload) {
  const { GETUSER_SUCCESS, GETUSER_FAILURE } = userConstants;
  const success = users => ({ type: GETUSER_SUCCESS, users });
  const failure = message => ({ type: GETUSER_FAILURE, message });

  try {
    const response = yield call(userService.getUser, payload);
    yield put(success(response));

    return response;
  } catch (error) {
    const errorMessages = error.response.data.error;

    yield put(failure(errorMessages));

    return undefined;
  }
}

export { loginSaga, registerSaga, getUserSaga };
