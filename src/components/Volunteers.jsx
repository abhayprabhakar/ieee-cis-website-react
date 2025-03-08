import React, { useEffect, useState } from "react";

const volunteersData = [
  {
    name: "Umashankar ",
    position: "Chair",
    order: 1,
    socialLinks: {},
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQGsdmD5356mag/profile-displayphoto-shrink_400_400/B4DZPV64CbHcAg-/0/1734460802707?e=1745452800&v=beta&t=No0l6fh6IvNKMQHuvcFkq77_GFMT8ztDsW0FoqMxNkA",
  },
  {
    name: "Vishnu Kashyap D",
    position: "Vice Chair",
    order: 2,
    socialLinks: {
      linkedin:
        "https://www.linkedin.com/in/vishnu-kashyap-d-54a5b82a2?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/vishnukashyapd18",
      github: "https://github.com/VishnuKashyap0018",
    },
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQEW6bu1vAYUzw/profile-displayphoto-shrink_400_400/B56ZOh4vmCGgAg-/0/1733587840276?e=1745452800&v=beta&t=JywDohIpBm6LuRljTrMQN57N-QGYyvQ0AMGsttjkQyY",
  },
  {
    name: "Ramvel",
    position: "Secretary",
    order: 3,
    socialLinks: {},
    image: "/images/execom/avatar1.png",
  },
  {
    name: "Medha",
    position: "Joint Secretary",
    order: 4,
    socialLinks: {},
    image: "/images/execom/avatar1.png",
  },

  {
    name: "Vishal",
    position: "Treasurer",
    order: 5,
    socialLinks: {},
    image: "/images/execom/avatar1.png",
  },
  {
    name: "Thanmay",
    position: "Joint Treasurer",
    order: 6,
    socialLinks: {},
    image: "/images/execom/avatar1.png",
  },
  {
    name: "Abhay Prabhakar",
    position: "Webmaster",
    order: 7,
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/abhay-prabhakar",
      instagram: "https://www.instagram.com/abhay.__.p/",
      github: "https://github.com/abhayprabhakar/",
    },
    image: "/images/execom/abhay.jpeg",
  },
  {
    name: "Soumyadeep Ghosh",
    position: "Webmaster",
    order: 8,
    socialLinks: {},
    image: "/images/execom/avatar1.png",
  },
  {
    name: "Nithin",
    position: "Tech Head",
    order: 9,
    socialLinks: {},
    image: "/images/execom/avatar1.png",
  },
  {
    name: "Sai Samay",
    position: "Tech Associate",
    order: 10,
    socialLinks: {},
    image: "/images/execom/avatar1.png",
  },
  {
    name: "Manognya G",
    position: "Media Head",
    order: 11,
    socialLinks: {},
    image: "/images/execom/avatar1.png",
  },
  {
    name: "Valli Gayatri Patibanda",
    position: "Media Associate",
    order: 12,
    socialLinks: {
      linkedin:
        "https://www.linkedin.com/in/valli-gayatri-patibanda-3a005b1b8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram:
        "https://www.instagram.com/gayatrii_p?igsh=MTQ3dWh3ZTljdHV4NQ==",
    },
    image: "/images/execom/avatar1.png",
  },
  {
    name: "Meghana S",
    position: "Content & Design Head",
    order: 13,
    socialLinks: {},
    image: "/images/execom/avatar1.png",
  },
  {
    name: "Disha Jain",
    position: "Content & Design Associate",
    order: 14,
    socialLinks: {
      linkedin: "http://www.linkedin.com/in/disha-jain275",
    },
    image: "/images/execom/avatar1.png",
  },
  {
    name: "Abdul Majid",
    position: "Events & Operation Head",
    order: 15,
    socialLinks: {},
    image: "/images/execom/avatar1.png",
  },
  {
    name: "Sinchana Anil",
    position: "Events & Operation Associate",
    order: 16,
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/sinchana-anil-161a68337",
      instagram:
        "https://www.instagram.com/sinchanaa_anil?igsh=cWQ2OTNxb2I5bW15",
    },
    image: "/images/execom/avatar1.png",
  },
  {
    name: "Yeshwanth",
    position: "Marketing Head",
    order: 17,
    socialLinks: {},
    image: "/images/execom/avatar1.png",
  },
  {
    name: "Sagar Y J",
    position: "Marketing Associate",
    order: 18,
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/sagar-yj-a70411321/",
      instagram: "https://www.instagram.com/sagaryj03/",
      github: "https://github.com/Sagaryj",
    },
    image: "/images/execom/avatar1.png",
  },
  {
    name: "Keerthana Sindhu",
    position: "Marketing Associate",
    order: 19,
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/ks-aabz7",
      instagram: "https://www.instagram.com/keerrth_04?igsh=cG96dGcxaHl3cWox",
      github: "https://github.com/Keerthana040",
    },
    image: "/images/execom/avatar1.png",
  },
];

const Volunteers = () => {
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
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={`fab fa-${platform}`}></i>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Volunteers;
