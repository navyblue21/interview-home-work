import { Action } from "redux";

import { userConstants } from "../constants";

const registration = (state = {}, action: Action) => {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { isRegistering: true };

    case userConstants.REGISTER_SUCCESS:
    case userConstants.REGISTER_FAILURE:
      return { isRegistering: false };

    default:
      return state;
  }
};

export default registration;
