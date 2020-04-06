import React from "react";

import { store } from "../../helpers";
import { postActions, userActions } from "../../data/actions";
import Home from "./Home";

export default async function action() {
  await store.dispatch(postActions.getPost());
  await store.dispatch(userActions.getUser());

  return {
    title: "Home page",
    component: <Home />,
  };
}
