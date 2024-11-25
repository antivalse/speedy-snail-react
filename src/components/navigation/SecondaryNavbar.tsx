/* Secondary Navbar Component */

import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { avatars, hamburgerMenuIcon } from "../../assets/icons";
import { Link } from "react-router-dom";
import useGetUser from "../../hooks/useGetUser";
import LoadingSpinner from "../ui/LoadingSpinner";

const SecondaryNavbar = () => {
  const [showNavDropdown, setShowNavDropdown] = useState<boolean>(false);
  const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);

  // Get the logout function from auth context
  const { logout } = useAuth();

  // Get the avatar id from useGetUser hook
  const { avatarId, loading } = useGetUser();

  // Find user avatar and render in navbar
  const userAvatar = avatars.find((item) => item.id == avatarId);

  return (
    <>
      {loading && <LoadingSpinner />}
      <nav className="secondary-nav flex justify-between items-center p-3 bg-p50">
        <div className="relative">
          {" "}
          <span
            className="hamburger-icon"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => setShowNavDropdown(!showNavDropdown)}
          >
            {hamburgerMenuIcon}
          </span>
          {showNavDropdown && (
            <div
              className="absolute left-0 z-10 mt-4 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={-1}
              onClick={() => setShowNavDropdown(!showNavDropdown)}
            >
              <div className="py-1" role="none">
                <a
                  href="/today"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-1"
                >
                  Daily Plan Page
                </a>
                <a
                  href="/image-gallery"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-2"
                >
                  Image Gallery
                </a>
              </div>
            </div>
          )}
        </div>
        <h2 className="heading heading--logo-dark color-p300 cursor-default">
          Speedy Snail
        </h2>{" "}
        <div className="relative">
          {" "}
          <span
            className=" secondary-nav__avatar"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            {userAvatar?.icon}
          </span>
          {showUserDropdown && (
            <div
              className="absolute right-0 mt-2 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={-1}
              onClick={() => setShowNavDropdown(!showUserDropdown)}
            >
              <div className="py-1" role="none">
                <a
                  href="/settings"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-0"
                >
                  Account settings
                </a>
                <form method="POST" action="#" role="none">
                  <Link
                    to="/"
                    type="submit"
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-3"
                    onClick={logout}
                  >
                    Sign out
                  </Link>
                </form>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default SecondaryNavbar;
