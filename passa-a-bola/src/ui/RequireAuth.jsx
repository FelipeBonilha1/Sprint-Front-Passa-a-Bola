import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const isAuthed = !!localStorage.getItem("pb_token");
  const loc = useLocation();
  return isAuthed ? children : <Navigate to="/login" state={{ from: loc }} replace />;
}
