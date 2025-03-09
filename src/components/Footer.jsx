import "../styles/footer.css";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  faInstagram,
  faLinkedin,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  const location = useLocation(); // Get current route

  // Function to determine class based on route
  const getFooterClass = () => {
    if (location.pathname === "/") return "footer footer-home";
    if (location.pathname === "/about") return "footer footer-about";
    if (location.pathname === "/contact") return "footer footer-contact";
    if (location.pathname === "/membership") return "footer footer-membership";
    if (location.pathname === "/team") return "footer footer-team";
    if (location.pathname === "/articles") return "footer footer-articles";
    return "footer default-footer";
  };

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const loadAllScripts = async () => {
      try {
        await loadScript("/js/common.js");
        console.log("All scripts loaded successfully");
      } catch (error) {
        console.error("Error loading scripts", error);
      }
    };

    loadAllScripts();
  }, []);

  return (
    <footer className={getFooterClass()}>
      <div className="footer-container">
        <div className="footer-section">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links-list">
            <li className="footer-link-item">
              <a
                href="https://maps.app.goo.gl/tXekyq6MMWr4CkNf6"
                target="_blank"
                className="footer-link"
              >
                Campus Map
              </a>
            </li>
            <li className="footer-link-item">
              <a
                href="https://ieee-bmsit.bmsit.ac.in"
                target="_blank"
                className="footer-link"
              >
                IEEE Student Branch
              </a>
            </li>
            <li className="footer-link-item">
              <a
                href="https://bmsit.ac.in"
                target="_blank"
                className="footer-link"
              >
                BMSIT
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Headquarters</h4>
          <p className="footer-text">
            <span id="bmsit">BMS Institute of Technology and Management</span>
            <br />
            Doddaballapur Main Road, Avalahalli,
            <br />
            Yelahanka, Bengaluru,
            <br />
            Karnataka 560064
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Contact Us</h4>
          <div className="footer-contact">
            <div className="footer-contact-item">
              <FontAwesomeIcon
                icon={faPhone}
                className="footer-contact-icon"
                size="1x"
              />
              <a href="tel:+91234234213" className="footer-link">
                Umashankar S
              </a>
            </div>
            <div className="footer-contact-item">
              <FontAwesomeIcon
                icon={faPhone}
                className="footer-contact-icon"
                size="1x"
              />
              <a href="tel:+91123412342" className="footer-link">
                Vishnu Kashyap D
              </a>
            </div>
            <div className="footer-contact-item">
              <FontAwesomeIcon
                icon={faPhone}
                className="footer-contact-icon"
                size="1x"
              />
              <a href="tel:+919148267350" className="footer-link">
                Abhay Prabhakar
              </a>
            </div>
            <div className="footer-contact-item">
              <FontAwesomeIcon
                icon={faPhone}
                className="footer-contact-icon"
                size="1x"
              />
              <a href="tel:+919332412312" className="footer-link">
                Soumyadeep Ghosh
              </a>
            </div>
          </div>

          <div className="footer-social-links">
            <a
              href="https://www.instagram.com/cis_bmsit/"
              target="_blank"
              className="footer-social-link"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/ieee-cis-bmsit/"
              target="_blank"
              className="footer-social-link"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="mailto:ieee@bmsit.in"
              target="_blank"
              className="footer-social-link"
            >
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-credit">
        Made with
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="red"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 14.36 2 11.25 2 7.5 2 4.42 4.42 2 7.5 2 9.12 2 10.68 2.81 12 4.05 13.32 2.81 14.88 2 16.5 2 19.58 2 22 4.42 22 7.5c0 3.75-3.4 6.86-8.55 12.54L12 21.35z" />
        </svg>
        by IEEE CIS BMSIT&M
      </div>
    </footer>
  );
};

export default Footer;
