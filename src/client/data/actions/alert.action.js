import { ActionCreator } from "redux";
import { alertConstants } from "../constants";

const success: ActionCreator = message => ({
  type: alertConstants.SUCCESS,
  message,
});
const error = message => ({ type: alertConstants.ERROR, message });
const clear = () => ({ type: alertConstants.CLEAR });

const alertActions = { success, error, clear };

export default alertActions;
