import "../styles/team.css";
import "../styles/teamhero.css";
import ThreeTerrain from "../components/HeroSections/ThreeTerrain"; // Import the Three.js component
import Volunteers from "../components/Volunteers";

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
          <h2 className="volunteer-title">Executive Committee</h2>

          <div className="volunteer-container" id="volunteer-container">
            <Volunteers />
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
