import { createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <Main />
      }
    ]
  },
]);
