import React from "react";
import { RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { router } from "./routes";
import SessionContextProvider from "./context/sessionContext";

const App = () => {
  return (
    <div className="bg-slate-900 h-screen">
      <div className="flex justify-center items-center h-screen">
        <SessionContextProvider>
          <RouterProvider router={router} />
        </SessionContextProvider>
      </div>
    </div>
  );
};

export default App;
