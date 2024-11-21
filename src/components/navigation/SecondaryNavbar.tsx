/* Secondary Navbar Component */

import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { hamburgerMenuIcon, snailAvatar } from "../../assets/icons";
import { Link } from "react-router-dom";

const SecondaryNavbar = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  // Get the logout function from auth context
  const { logout } = useAuth();
  return (
    <nav className="secondary-nav flex justify-between items-center p-3 bg-p50">
      <div className="relative">
        {" "}
        <span
          className="hamburger-icon "
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {hamburgerMenuIcon}
        </span>
        {showDropdown && (
          <div
            className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="py-1" role="none">
              <a
                href="/today"
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-1"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                Daily Plan Page
              </a>
              <a
                href="/image-gallery"
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-2"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                Image Gallery
              </a>
              <a
                href="/settings"
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-0"
                onClick={() => setShowDropdown(!showDropdown)}
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
      <h2 className="heading heading--logo-dark color-p300 cursor-default">
        Speedy Snail
      </h2>{" "}
      <span className="secondary-nav__avatar">{snailAvatar}</span>
    </nav>
  );
};

export default SecondaryNavbar;
