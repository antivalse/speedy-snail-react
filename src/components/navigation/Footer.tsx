/* Footer Component */

import { facebookIcon, infoIcon, instagramIcon } from "../../assets/icons";

const Footer = () => {
  return (
    <footer className="footer bg-s500 flex flex-col items-center color-p300">
      <div className="footer__inner bg-p100 py-10">
        {" "}
        <div className="ml-5">
          <h3 className="heading heading--footer">Speedy Snail</h3>
          <p>Join us and start owning your day.</p>
        </div>
      </div>
      <div className="footer__bottom px-5 pt-10">
        <div className="footer__social-media-links flex gap-4">
          <a
            className="footer__bottom__link"
            href="https://www.instagram.com/speedysnail_dailyplanner/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {instagramIcon}
          </a>
          <a
            className="footer__bottom__link"
            href="https://www.facebook.com/profile.php?id=61568583931513"
            target="_blank"
            rel="noopener noreferrer"
          >
            {facebookIcon}{" "}
          </a>
          <a
            className="footer__bottom__link"
            href="/about"
            rel="noopener noreferrer"
          >
            {infoIcon}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
