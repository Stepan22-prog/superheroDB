import { createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import App from "./App";
import SuperheroDetails from "./pages/SuperheroDetails";
import CreateSuperhero from "./pages/CreateSuperhero";

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
        path: '/superhero/create',
        element: <CreateSuperhero />
      },
      {
        path: '/superhero/:superheroId',
        element: <SuperheroDetails />
      },
    ]
  },
]);
