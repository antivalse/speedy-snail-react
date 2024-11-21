/* Footer Component */

import { Link } from "react-router-dom";
import SnailLogo from "../../assets/images/logos/speedy_snail_footerlogo.svg";
import { facebookIcon, instagramIcon } from "../../assets/icons";

const Footer = () => {
  return (
    <footer className="footer bg-p300 flex flex-col items-center">
      <h3 className="heading heading--logo">Speedy Snail</h3>
      <Link to="/about">
        <img src={SnailLogo} alt="Happy Snail Logo" />
      </Link>
      <p className="body body--secondary footer__social-media-header">Follow</p>
      <div className="footer__social-media-links flex gap-4">
        <a
          className="footer__social-media-links__link"
          href="https://www.instagram.com/speedysnail_dailyplanner/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {instagramIcon}
        </a>
        <a
          className="footer__social-media-links__link"
          href="https://www.facebook.com/profile.php?id=61568583931513"
          target="_blank"
          rel="noopener noreferrer"
        >
          {facebookIcon}{" "}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
