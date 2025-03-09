import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const iconMap = {
  instagram: faInstagram,
  linkedin: faLinkedin,
  github: faGithub,
  twitter: faTwitter,
  phone: faPhone,
  email: faEnvelope,
};

const Volunteers = ({ volunteersData }) => {
  useEffect(() => {
    const lazyImages = document.querySelectorAll(".lazy-load");
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add("loaded");
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: "50px" }
    );

    lazyImages.forEach((img) => observer.observe(img));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="volunteer-container">
      {volunteersData.map((volunteer) => (
        <div key={volunteer.order} className="volunteer-card">
          <img
            className="volunteer-image lazy-load"
            data-src={volunteer.image}
            alt={volunteer.name}
          />
          <div className="volunteer-name">{volunteer.name}</div>
          <div className="volunteer-position">{volunteer.position}</div>
          <div className="social-icons">
            {Object.entries(volunteer.socialLinks).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={iconMap[platform]} size="1x" />
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Volunteers;
