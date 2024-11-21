/* Public Layout */

import { Outlet } from "react-router-dom";
import MainNavbar from "../components/navigation/MainNavbar";

const PublicLayout = () => {
  return (
    <>
      <MainNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;
