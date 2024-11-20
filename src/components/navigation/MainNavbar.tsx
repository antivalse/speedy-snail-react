/* Main Navbar Component */

import { Link } from "react-router-dom";
import Logo from "../../assets/images/logos/speedy_snail_logo.svg";
import Button from "../buttons/Button";

const MainNavbar = () => {
  return (
    <nav className="main-navbar bg-p50">
      <div className="main-navbar__left flex flex-col items-center gap-8 mt-5">
        <h1>
          <Link to="/">
            <img src={Logo} alt="speedy_snail_logo" />
          </Link>
        </h1>
        <p className="body body--secondary color-p200">Getting Stuff Done</p>
      </div>
      <div className="main-navbar__right flex gap-5 p-5">
        <Button
          hasLink={true}
          btnText="Login"
          className="btn btn--primary"
          href={"/"}
        />
        <Button
          hasLink={true}
          btnText="Sign-up"
          className="btn btn--secondary"
          href={"/signup"}
        />
      </div>
    </nav>
  );
};

export default MainNavbar;
