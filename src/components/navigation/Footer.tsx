/* Footer Component */

import { useState } from "react";
import { facebookIcon, infoIcon, instagramIcon } from "../../assets/icons";
import ContactForm from "../forms/ContactForm";

const Footer = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <footer className="footer bg-s500 flex flex-col items-center color-p300">
      <div className="footer__inner bg-p100 py-10">
        {" "}
        <div className="ml-5">
          <h3 className="heading heading--footer">Speedy Snail</h3>
          <p>Join us and start owning your day</p>
          <p
            className="footer__inner__contact body body--secondary pt-5 cursor-pointer inline-block"
            onClick={() => setShowModal(true)}
          >
            Contact Us
          </p>
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
      {showModal && <ContactForm />}
    </footer>
  );
};

export default Footer;
