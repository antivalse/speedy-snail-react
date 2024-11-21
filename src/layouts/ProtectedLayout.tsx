/* Protected Layout */

import { Outlet, Navigate } from "react-router-dom";
import SecondaryNavbar from "../components/navigation/SecondaryNavbar";
import useAuth from "../hooks/useAuth";

const ProtectedLayout = () => {
  const { user } = useAuth();

  // Redirect to "/" if no user is logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <SecondaryNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default ProtectedLayout;
