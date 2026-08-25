import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Home, Login } from "./pages";
import {
  Dashboard,
  CreateMatch,
  AddCommentary,
  ProtectedRoute,
  Layout,
} from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Dashboard /> },
          { path: "create-match", element: <CreateMatch /> },
          { path: "add-commentary", element: <AddCommentary /> },
        ],
      },
    ],
  },
]);

export default router;
