/* Public Layout */

import { Outlet } from "react-router-dom";
import MainNavbar from "../components/navigation/MainNavbar";

const PublicLayout = () => {
  return (
    <div>
      <MainNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
