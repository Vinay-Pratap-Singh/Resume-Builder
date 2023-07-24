import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Stepper from "../pages/Stepper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/form",
    element: <Stepper />,
  },
]);

export default router;
