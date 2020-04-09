import Home from "./Home";
import Login from "./Login";

const routes = [
  {
    path: "/login",
    action: () => {
      const isLoggedIn = localStorage.getItem("token");

      if (isLoggedIn) {
        return { redirect: "/" };
      }

      return Login();
    },
  },
  {
    path: "",
    action: ({ next }) => {
      const isLoggedIn = localStorage.getItem("token");

      if (isLoggedIn) {
        return next();
      }

      return { redirect: "/login" };
    },
    children: [{ path: "", action: Home }],
  },
];

export default routes;
