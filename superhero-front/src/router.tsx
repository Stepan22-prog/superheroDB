import { createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import App from "./App";
import SuperheroDetails from "./pages/SuperheroDetails";
import CreateSuperhero from "./pages/CreateSuperhero";
import EditSuperhero from "./pages/EditSuperhero";
import ErrorPage from "./pages/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
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
        path: '/superhero/edit/:superheroId',
        element: <EditSuperhero />
      },
      {
        path: '/superhero/:superheroId',
        element: <SuperheroDetails />
      },
    ]
  },
]);
