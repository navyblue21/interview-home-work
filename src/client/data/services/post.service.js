import axios from "axios";

const getPosts = async (id = "") => {
  const URL = `/posts/${id}`;
  const result = await (await axios.get(URL)).data.data;

  return result;
};

const postService = { getPosts };

export default postService;
