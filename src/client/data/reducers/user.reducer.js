import { Action } from "redux";

import { userConstants } from "../constants";

const user = (state = {}, action: Action) => {
  const { message = "", users = [] } = action;

  switch (action.type) {
    case userConstants.GETUSER_REQUEST:
      return { isGettingUser: true };

    case userConstants.GETUSER_SUCCESS:
      return { isGettingUser: false, users };

    case userConstants.GETUSER_FAILURE:
      return { isGettingUser: false, message };

    default:
      return state;
  }
};

export default user;
