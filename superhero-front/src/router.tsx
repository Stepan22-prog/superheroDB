import { createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import App from "./App";
import SuperheroDetails from "./pages/SuperheroDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <Main />
      },
      {
        path: '/superhero/:superheroId',
        element: <SuperheroDetails />
      }
    ]
  },
]);
