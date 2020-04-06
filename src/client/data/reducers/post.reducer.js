import { Action } from "redux";

import { postConstants } from "../constants";

const getPost = (state = {}, action: Action) => {
  const { message = "", posts = [] } = action;

  switch (action.type) {
    case postConstants.GETPOST_REQUEST:
      return { isGettingPosts: true };

    case postConstants.GETPOST_SUCCESS:
      return { isGettingPosts: false, posts };

    case postConstants.GETPOST_FAILURE:
      return { isGettingPosts: false, message };

    default:
      return state;
  }
};

export default getPost;
