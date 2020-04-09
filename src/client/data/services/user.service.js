import axios, { AxiosResponse } from "axios";

const logout = async () => {
  // remove user from local storage to log user out
  const URL = "/users/logout";
  const user = localStorage.getItem("user");
  const token = user && user.token;

  console.info(token);

  try {
    await axios.delete(URL, { data: { token } });
    localStorage.removeItem("token");
  } catch (error) {
    console.error(error);
  }
};

const storeSession = token => {
  localStorage.setItem("token", JSON.stringify(token));
};

const handleResponse = (response: AxiosResponse) => {
  const { data } = response;
  const { status } = response;

  if (status === 401) {
    // auto logout if 401 response returned from api
    logout();
    window.location.reload();
  }

  return data;
};

const login = async ({ username, password }) => {
  const payload = { username, password };
  const URL = `/users/authenticate`;
  const { data, success } = await axios.post(URL, payload).then(handleResponse);
  const { user, token } = data;

  if (success === false) {
    throw new Error("No user found!");
  }

  storeSession(token);

  return user;
};

const register = async ({ username, password, name, dob }) => {
  const data = { username, password, name, dob };
  const URL = "/users/register";
  const result = await axios.post(URL, data).then(handleResponse);

  return result;
};

const getUser = async (id = "") => {
  const URL = `/users/${id}`;
  const result = await (await axios.get(URL)).data.data;

  return result;
};

const userService = {
  login,
  logout,
  register,
  storeSession,
  getUser,
};

export default userService;
