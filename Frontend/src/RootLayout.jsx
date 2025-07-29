import { Outlet } from "@tanstack/react-router";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";

const RootLayout = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
    <NavBar isLoggedIn={isLoggedIn} />
      <Outlet />
      <Footer />

    </>
  );
};

export default RootLayout;
