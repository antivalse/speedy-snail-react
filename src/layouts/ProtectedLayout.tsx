/* Protected Layout */

import { Outlet, useNavigate } from "react-router-dom";
import SecondaryNavbar from "../components/navigation/SecondaryNavbar";
import useAuth from "../hooks/useAuth";

const ProtectedLayout = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  if (!user) {
    navigate("/");
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
