import { userConstants } from "../constants";
// import { userService } from "../services";
// import { history } from "../../helpers";
// import alertActions from "./alert.action";

const login = (username: String, password: String) => {
  // const request = user => ({ type: userConstants.LOGIN_REQUEST, user });
  // const success = user => ({ type: userConstants.LOGIN_SUCCESS, user });
  // const failure = user => ({ type: userConstants.LOGIN_FAILURE, user });
  // return (dispatch: Dispatch) => {
  //   dispatch(request({ username }));
  //   userService
  //     .login(username, password)
  //     .then(user => {
  //       dispatch(success(user));
  //       history.push("/");
  //     })
  //     .catch(error => {
  //       const errorMessages = error.response.data.error;
  //       dispatch(failure(errorMessages));
  //       dispatch(alertActions.error(errorMessages));
  //     });
  // };
  return { type: userConstants.LOGIN_REQUEST, user: { username, password } };
};

const logout = () => {
  return { type: userConstants.LOGOUT };
};

const register = (userInfo: Object) => {
  // const request = user => ({ type: userConstants.REGISTER_REQUEST, user });
  // const success = user => ({ type: userConstants.REGISTER_SUCCESS, user });
  // const failure = user => ({ type: userConstants.REGISTER_FAILURE, user });

  // return (dispatch: Dispatch) => {
  //   dispatch(request(userInfo));

  //   userService
  //     .register(userInfo)
  //     .then(user => {
  //       dispatch(success(user));

  //       history.push("/login");
  //       dispatch(alertActions.success("Registration successful!"));
  //     })
  //     .catch(error => {
  //       const errorMessages = error.response.data.error;

  //       dispatch(failure(errorMessages));
  //       dispatch(alertActions.error(errorMessages));
  //     });
  // };
  return { type: userConstants.REGISTER_REQUEST, user: userInfo };
};

const getUser = (id = "") => {
  return { type: userConstants.GETUSER_REQUEST, id };
};

const userActions = { login, logout, register, getUser };

export default userActions;
