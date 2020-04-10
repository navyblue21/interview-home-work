import axios from "axios";

import utilities from "../../helpers/utilities";

const getPosts = async (id = "") => {
  const token = utilities.getToken();
  const URL = `/posts/${id}`;

  const result = await (await axios.get(URL, {
    headers: { Authorization: `Bearer ${token}` },
  })).data.data;

  return result;
};

const postService = { getPosts };

export default postService;
