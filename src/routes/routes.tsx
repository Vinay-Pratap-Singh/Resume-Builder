import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Stepper from "../pages/Stepper";
import Preview from "../pages/Preview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/form",
    element: <Stepper />,
  },
  {
    path: "/preview",
    element: <Preview />,
  },
]);

export default router;
