import "../styles/home.css";
import HomeHero from "../components/HeroSections/HomeHero.jsx";
import React from "react";

const eventsData = [
  {
    type: "Tech Talk",
    title: "Tech Summit 2025",
    date: "March 10, 2025",
    description:
      "Join us for an exciting tech summit featuring industry leaders.",
    image:
      "https://techsummit.ai/wp-content/uploads/2024/03/AI-Tech-Summit-Skopje-2023-428.jpg",
    link: "/home", // Update with actual route
  },
  {
    type: "Workshop",
    title: "AI Workshop",
    date: "April 5, 2025",
    description: "A hands-on workshop exploring AI and Machine Learning.",
    image:
      "https://www.unlv.edu/sites/default/files/styles/1920_width/public/media/image/2023-05/AI%20Workshop%20Image.jpg?itok=hYN3AmnH",
    link: "/home", // Update with actual route
  },
  {
    type: "Hackathon",
    title: "Hackathon 2025",
    date: "May 15, 2025",
    description: "Compete in a 24-hour coding challenge and win prizes!",
    image:
      "https://edison365.com/?seraph_accel_gi=wp-content%2Fuploads%2F2022%2F03%2FHow-do-hackathons-work.png&n=iNf2OlXUkWEBkZdk37MnnA",
    link: "https://www.google.com",
  },
];

const Home = () => {
  const handleCardClick = (link) => {
    window.location.href = link; // Redirect on click
  };

  return (
    <>
      <HomeHero />

      <section className="overview-section">
        <div className="container">
          <div className="left">
            <div className="text-content-h2">
              <h2>About IEEE Computational Intelligence Society</h2>
            </div>
            <div className="text-content">
              <p>
                The IEEE Computational Intelligence Society (CIS) is dedicated
                to advancing the field of computational intelligence through
                research, innovation, and global collaboration. We focus on
                artificial intelligence, neural networks, fuzzy logic, and
                evolutionary computation to shape the future of intelligent
                systems.
              </p>
              <p id="join-us">
                Join us to connect with researchers, professionals, and students
                passionate about AI and machine learning.
              </p>
              <a href="/membership" className="button">
                Become a Member
              </a>
            </div>
          </div>
          <div className="image-content">
            <img src="/images/ieee-cis-overview.jpg" alt="IEEE CIS Overview" />
          </div>
        </div>
      </section>

      <section className="upcoming-events" id="upcoming-events">
        <h2>Upcoming Events</h2>
        <div id="events-container" className="events-container">
          {eventsData.map((event, index) => (
            <div
              key={index}
              className="event-card"
              onClick={() => handleCardClick(event.link)}
              style={{ cursor: "pointer" }} // Makes it visually clickable
            >
              <img
                className="event-image"
                src={event.image}
                alt={event.title}
              />
              <div className="event-type">{event.type}</div>
              <div className="event-title">{event.title}</div>
              <div className="event-description">{event.description}</div>
              <div className="event-date">{event.date}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
