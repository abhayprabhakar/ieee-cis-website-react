import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/NavBar.jsx"; // Navigation Bar
import Header from "./components/Header.jsx";
import Preload from "./components/Preload.jsx";
import About from "./pages/About";
import Articles from "./pages/Articles";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Team from "./pages/Team";
import Membership from "./pages/Membership.jsx";
import Footer from "./components/Footer"; // Optional footer

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating content load delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading ? (
        <Preload />
      ) : (
        <>
          <Header />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/events" element={<Events />} />
            <Route path="/team" element={<Team />} />
            <Route path="/membership" element={<Membership />} />
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  );
}

export default App;
