import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shell from "./ui/Shell.jsx";      // cabeçalho/rodapé com o MESMO estilo do primeiro layout
import Home from "./pages/home.jsx";     // a landing igual ao primeiro layout
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Feed from "./pages/Feed.jsx";
import Publish from "./pages/Publish.jsx";
import Search from "./pages/Search.jsx";
import Nearby from "./pages/Nearby.jsx";
import History from "./pages/History.jsx";
import RequireAuth from "./ui/RequireAuth.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const router = createBrowserRouter([
  {
    element: <Shell />,
    children: [
      { path: "/", element: <Home /> },       // landing do layout original
      { path: "/login", element: <Login /> },
      { path: "/perfil", element: <Profile /> },
      { path: "/feed", element: <Feed /> },
      { path: "/publicar", element: <Publish /> },
      { path: "/buscar", element: <Search /> },
      { path: "/perto", element: <Nearby /> },
      { path: "/historico", element: <History /> },
      { path: "/perfil", element: <RequireAuth><Profile/></RequireAuth> },
      { path: "/publicar", element: <RequireAuth><Publish/></RequireAuth> },
      { path:"/dashboard" ,element: <Dashboard />},

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
