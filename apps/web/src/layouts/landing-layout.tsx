import { Outlet, useLocation } from "react-router";
import Navbar from "./navbar";
import Footer from "./footer";

export default function LandingLayout({}) {
  const location = useLocation();

  const authRoutes = ["/sign-in", "/sign-up"];
  const isNotAuthRoute = !authRoutes.includes(location.pathname);

  return (
    <>
      <Navbar />
      <Outlet />
      {isNotAuthRoute && <Footer />}
    </>
  );
}
