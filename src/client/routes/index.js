import Home from "./Home";
import Login from "./Login";

const routes = [
  {
    path: "/login",
    action: () => {
      const isLoggedIn = JSON.parse(sessionStorage.getItem("user"));
      const result = isLoggedIn ? { redirect: "/" } : Login();

      return result;
    },
  },
  {
    path: "",
    action: ({ next }) => {
      const isLoggedIn = JSON.parse(sessionStorage.getItem("user"));
      const result = isLoggedIn ? next() : { redirect: "/login" };

      return result;
    },
    children: [{ path: "", action: Home }],
  },
];

export default routes;
