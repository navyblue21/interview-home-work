import axios, { AxiosResponse } from "axios";

const { stringify } = JSON;

const logout = () => {
  // remove user from local storage to log user out
  sessionStorage.removeItem("user");
};

const storeSession = user => {
  sessionStorage.setItem("user", stringify(user));
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
  const data = { username, password };
  const URL = `/users/authenticate`;
  const user = await axios.post(URL, data).then(handleResponse);
  const isUserAvailable = !!user;

  if (isUserAvailable === false) {
    throw new Error("No user found!");
  }

  storeSession(user.data);

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
