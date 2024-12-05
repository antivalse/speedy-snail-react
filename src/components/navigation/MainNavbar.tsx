/* Main Navbar Component */

import { Link } from "react-router-dom";
import Logo from "../../assets/images/logos/speedy_snail_logo.svg";
import LogoLighter from "../../assets/images/logos/speedy_snail_logo_light.svg";
import Button from "../buttons/Button";
import scrollToDiv from "../../utils/helpers/scrollToDiv";
import useTheme from "../../hooks/useTheme";
import Theme from "../buttons/Theme";

const MainNavbar = () => {
  const { darkmode } = useTheme();
  return (
    <nav className={`relative main-navbar ${darkmode ? "bg-p300" : "bg-p50"}`}>
      <div className="absolute top-2 right-2">
        <Theme isDropdown={false} />
      </div>
      <div className="main-navbar__left flex flex-col items-center gap-8 mt-5">
        <h1>
          <Link to="/">
            <img src={darkmode ? LogoLighter : Logo} alt="speedy_snail_logo" />
          </Link>
        </h1>
        <p
          className={`body body--secondary ${
            darkmode ? "color-s700" : "color-p200"
          }`}
        >
          Getting Stuff Done
        </p>
      </div>
      <div className="main-navbar__right flex gap-5 p-5 mb-20">
        <Button
          scrollToView={true}
          onClick={() => scrollToDiv("login-form")}
          btnText="Login"
          className="btn btn--primary"
          href={"/login"}
        />
        <Button
          scrollToView={false}
          btnText="Sign-up"
          className="btn btn--secondary"
          href={"/signup"}
        />
      </div>
    </nav>
  );
};

export default MainNavbar;
