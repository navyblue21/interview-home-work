import { postConstants } from "../constants";

const getPost = (id = "") => {
  return { type: postConstants.GETPOST_REQUEST, id };
};

const putPost = post => {
  return { type: postConstants.PUTPOST_REQUEST, post };
};

const deletePost = (id = "") => {
  return { type: postConstants.DELETEPOST_REQUEST, id };
};

const postActions = { getPost, putPost, deletePost };

export default postActions;
