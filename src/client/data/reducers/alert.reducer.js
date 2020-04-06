import { Action } from "redux";

import { alertConstants } from "../constants";

const alert = (state = {}, action: Action) => {
  const { message } = action;

  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: "alertSuccess",
        message,
      };
    case alertConstants.ERROR:
      return {
        type: "alertDanger",
        message,
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state;
  }
};

export default alert;
