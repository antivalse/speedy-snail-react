/* Footer Component */

import { facebookIcon, instagramIcon } from "../../assets/icons";

const Footer = () => {
  return (
    <footer className="footer bg-s500 flex flex-col items-center">
      <div className="footer__inner bg-p100 py-10">
        {" "}
        <div className="ml-5">
          <h3 className="heading heading--footer color-p300">Speedy Snail</h3>
          <p className="color-p300 ">Join us and start owning your day.</p>
        </div>
      </div>
      <div className="footer__bottom flex justify-between items-center px-5 pt-10">
        <div className="footer__social-media-links flex gap-4 ml-5">
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
        <p className="body body--secondary color-p300 whitespace-nowrap mr-5">
          &copy; Speedy Snail 2024
        </p>
      </div>
    </footer>
  );
};

export default Footer;
