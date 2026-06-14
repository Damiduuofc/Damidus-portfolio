import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingProvider";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import SocialIcons from "./components/SocialIcons";
import Landing from "./components/Landing";
import About from "./components/About";
import WhatIDo from "./components/WhatIDo";
import Work from "./components/Work";
import ProjectsPage from "./components/ProjectsPage";
//import Career from "./components/Career";
import Contact from "./components/Contact";

const HomePage = () => (
  <>
    <Cursor />
    <Navbar />
    <SocialIcons />
    <Landing />
    <About />
    <WhatIDo />
    <Work />
    {/* <Career /> */}
    <Contact />
  </>
);

const App = () => {
  return (
    <LoadingProvider>
      <div id="smooth-wrapper">
        <main id="smooth-content" className="main-body">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Projects" element={<ProjectsPage />} />
          </Routes>
        </main>
      </div>
    </LoadingProvider>
  );
};

export default App;
