import "../styles/team.css";
import "../styles/teamhero.css";
import ThreeTerrain from "../components/HeroSections/ThreeTerrain"; // Import the Three.js component
import Volunteers from "../components/Volunteers";

const volunteersData = [
  {
    name: "Umashankar",
    position: "Chair",
    order: 1,
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/umashankar-s-8186b2286/",
    },
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
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQHmk8ryUKt14g/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1730543082071?e=1746662400&v=beta&t=gDPSbVnnd93nsW815WXNRP5CCcgZ3TXfXhIgeFDa9hA",
  },
  {
    name: "Medha",
    position: "Joint Secretary",
    order: 4,
    socialLinks: {},
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQG8wnTTa3yLuw/profile-displayphoto-shrink_400_400/B56ZQfXDd5G8Ag-/0/1735692925816?e=1746662400&v=beta&t=mcKubhPGdz9ytvwyUIYw1WeoAbbixNMn_c1bap1rOq4",
  },

  {
    name: "Vishal",
    position: "Treasurer",
    order: 5,
    socialLinks: {},
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQEWSnQYT3ISsA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1721578792016?e=1746662400&v=beta&t=Mk-PMlghhMEBu_XBZswcwEVLH9xJyPG6qOx-vmObH4c",
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
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQE_sy2m0rYwbw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1725071799619?e=1746662400&v=beta&t=Rw-CjLZzGbc7iU7a_aLZJQwjtTfb2dFD96Af45WuXlc",
  },
  {
    name: "Nithin",
    position: "Tech Head",
    order: 9,
    socialLinks: {},
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQFAkje1qNViJg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1702727203110?e=1746662400&v=beta&t=fJC-0gqdhdeCLEoB4RFVCyJ7RteBfuEzftn8mLR_Oto",
  },
  {
    name: "Sai Samay",
    position: "Tech Associate",
    order: 10,
    socialLinks: {
      linkedin:
        "https://www.linkedin.com/in/sai-samay-870205320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      instagram:
        "https://www.instagram.com/sai_samay?igsh=Zm13eHNnc2tmb2E5&utm_source=qr",
      github: "https://github.com/yamas14",
    },
    image:
      "https://media.licdn.com/dms/image/v2/D4E03AQGb5qMSFloZ3w/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1725188214385?e=1746662400&v=beta&t=iPrKD-VoyUak6ZGBtohtqzMuDhFsmSMqLcytOCONB30",
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
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQFCHT2c04fsJw/profile-displayphoto-shrink_400_400/B56ZOmKAS2GwAg-/0/1733659461600?e=1746662400&v=beta&t=5nsivYwSm8idrqM_ceH2VtVcv3v0prAsZrQSNwQtfGw",
  },
  {
    name: "Meghana S",
    position: "Content & Design Head",
    order: 13,
    socialLinks: {},
    image: "/images/execom/meghna.jpeg",
  },
  {
    name: "Disha Jain",
    position: "Content & Design Associate",
    order: 14,
    socialLinks: {
      linkedin: "http://www.linkedin.com/in/disha-jain275",
    },
    image:
      "https://media.licdn.com/dms/image/v2/D4E03AQHC3gZ6TVJWSA/profile-displayphoto-shrink_800_800/B4EZUi8tIEHcAc-/0/1740048094220?e=1746662400&v=beta&t=TZRQeneEcAwAOaC4mkdrGRLQZgNbK-rOYV2HTY1IFWk",
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
    image:
      "https://media.licdn.com/dms/image/v2/D4E03AQFzCSB6cpgvsQ/profile-displayphoto-shrink_200_200/B4EZQr.7wBGcAY-/0/1735904706816?e=1746662400&v=beta&t=qU0gRvJHFGgSFfXx8yquavrSTeVgaJ55IbusVT1lD9s",
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
    image: "/images/execom/sagar.JPG",
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
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQH_l403szcAFQ/profile-displayphoto-shrink_800_800/B56ZTPRB6_HwAo-/0/1738644136533?e=1746662400&v=beta&t=OICH0Sb8x299I8_CKJ6Xx3qmqrT5NxxN_-7WVgKmy_o",
  },
];

const Coordinators = [
  {
    name: "Dr. Sanjay M Belgaonkar",
    position: "Faculty Coordinator",
    order: 1,
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/sanjay-belgaonkar-7b40a4b",
    },
    image:
      "https://media.licdn.com/dms/image/v2/C5603AQGDku5JEgxDZA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1594447797022?e=1747267200&v=beta&t=dnoDIg9yLUF7cqT9I25WEX-B1pEWAy5QR2P61pDEBIo",
  },
];

const Team = () => {
  return (
    <>
      <div id="hero">
        <div id="hero-title">
          <span id="hero-title-1">Meet</span> <span id="hero-title-2">The</span>{" "}
          <span id="hero-title-3">Team</span>
        </div>
        <ThreeTerrain /> {/* Mount the Three.js terrain here */}
      </div>

      <section id="cis-team" className="cis-team">
        <div className="cis-container">
          <h2 className="volunteer-title">Coordinators</h2>

          <div className="volunteer-container" id="volunteer-container">
            <Volunteers volunteersData={Coordinators} />
          </div>
        </div>
        <div className="cis-container">
          <h2 className="volunteer-title">Executive Committee</h2>

          <div className="volunteer-container" id="volunteer-container">
            <Volunteers volunteersData={volunteersData} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
