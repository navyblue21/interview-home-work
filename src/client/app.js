import React from "react";
import ReactDOM from "react-dom";
import UniversalRouter from "universal-router";
import { Provider } from "react-redux";

import routes from "./routes";
import { store, history } from "./helpers";
// import GLOBAL from './GLOBAL';

import "bootstrap/dist/css/bootstrap.min.css";
import "./global.scss";

const container = document.getElementById("app");
const options = {
  // Customize the way to resolve route
  resolveRoute(context, params) {
    if (typeof context.route.action === "function") {
      return context.route.action(context, params);
    }

    return undefined;
  },
};

const renderRoutes = ({ title, component }) => {
  const App = <Provider store={store}>{component}</Provider>;

  ReactDOM.render(App, container, () => {
    document.title = title;
  });
};

const router = new UniversalRouter(routes, options);
const render = location => {
  router
    .resolve({ pathname: location.pathname })
    .then(result => {
      if (result.redirect) {
        history.replace(result.redirect);
      } else {
        renderRoutes(result);
      }
    })
    .catch(error => console.error(error));
};

render(history.location);
history.listen(render);
