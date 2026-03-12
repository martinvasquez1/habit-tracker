import { Navigate, Outlet } from "react-router";

export default function AuthRoutes({}) {
  const isAuthenticated = Boolean(localStorage.getItem("jwt"));

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
}
