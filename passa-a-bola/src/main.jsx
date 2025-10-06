// src/main.jsx
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Shell from "./ui/Shell.jsx";
import AppLoader from "./components/AppLoader.jsx";
import BootSplash from "./components/BootSplash.jsx";


const Home      = lazy(() => import("./pages/home.jsx"));
const Login     = lazy(() => import("./pages/Login.jsx"));
const Profile   = lazy(() => import("./pages/Profile.jsx"));
const Feed      = lazy(() => import("./pages/Feed.jsx"));
const Publish   = lazy(() => import("./pages/Publish.jsx"));
const Search    = lazy(() => import("./pages/Search.jsx"));
const Nearby    = lazy(() => import("./pages/Nearby.jsx"));
const History   = lazy(() => import("./pages/History.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const RequireAuth = lazy(() => import("./ui/RequireAuth.jsx"));

const router = createBrowserRouter([
  {
    element: <Shell />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/feed", element: <Feed /> },
      { path: "/buscar", element: <Search /> },
      { path: "/perto", element: <Nearby /> },
      { path: "/historico", element: <History /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/perfil", element: <Profile /> },
      { path: "/publicar", element: <Publish /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<AppLoader text="Carregando página…" />}>
      <BootSplash min={1800}> {/* ⬅️ tempo mínimo do splash */}
        <RouterProvider router={router} />
      </BootSplash>
    </Suspense>
  </React.StrictMode>
);
