import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../styles/navbar.css";

const NavBar = () => {
  const location = useLocation();
  const [menuActive, setMenuActive] = useState(false);
  const [navClass, setNavClass] = useState("default-nav"); // Default navbar class

  // Update navbar styling based on location
  useEffect(() => {
    const path = location.pathname.substring(1) || "home"; // Remove leading "/"
    setNavClass(`nav-${path}`);
    setMenuActive(false); // Close menu on route change
  }, [location]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav id="navbar" className={`${navClass} ${menuActive ? "menu-open" : ""}`}>
      <div className="nav-container">
        <div className="logo">
          <Link to="/">
            <img
              src="/images/IEEE_CIS_logo_White_RGB_72ppi.png"
              alt="IEEE CIS Logo"
              className="logo-img"
            />
          </Link>
        </div>

        {/* Hamburger Button */}
        <button
          className={`hamburger ${menuActive ? "active" : ""}`}
          id="hamburger-btn"
          aria-label="Toggle Menu"
          aria-expanded={menuActive}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Navbar Links */}
        <ul className={`nav-links ${menuActive ? "active" : ""}`} id="nav-menu">
          <li>
            <Link to="/" onClick={() => setMenuActive(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setMenuActive(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="/team" onClick={() => setMenuActive(false)}>
              Team
            </Link>
          </li>
          <li>
            <Link to="/events" onClick={() => setMenuActive(false)}>
              Events
            </Link>
          </li>
          <li>
            <Link to="/membership" onClick={() => setMenuActive(false)}>
              Membership
            </Link>
          </li>
          <li>
            <Link to="/articles" onClick={() => setMenuActive(false)}>
              Articles
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
