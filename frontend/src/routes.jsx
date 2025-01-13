import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TwoFaSetup from "./pages/TwoFaSetup";
import VerifyTwoFa from "./pages/VerifyTwoFa";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
      },

      {
        path: "/setup-2fa",
        element: <TwoFaSetup />,
        errorElement: <Error />,
      },
      {
        path: "/verify-2fa",
        element: <VerifyTwoFa />,
        errorElement: <Error />,
      },
    ],
  },
]);
