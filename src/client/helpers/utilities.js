const getToken = () => localStorage.getItem("token");

const storeSession = token => {
  localStorage.setItem("token", token);
};

const utilities = { getToken, storeSession };

export default utilities;
