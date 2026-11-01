import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { LoadingProvider } from "./context/LoadingProvider";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import SocialIcons from "./components/SocialIcons";
import Landing from "./components/Landing";
import About from "./components/About";
import WhatIDo from "./components/WhatIDo";
import Work from "./components/Work";
import Publications from "./components/Publications";
import Hackathons from "./components/Hackathons";
import ProjectsPage from "./components/ProjectsPage";
//import Career from "./components/Career";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import { usePageMeta } from "./hooks/usePageMeta";

const HomePage = () => {
  usePageMeta(
    "Damidu Abeysinghe | Full-Stack Developer & UI/UX Designer",
    "Portfolio of Damidu Abeysinghe, a Sri Lankan Information Systems undergraduate at KDU building full-stack web apps with React, Next.js, Node.js and MongoDB. Projects, AI research and UI/UX designathon work.",
    "/"
  );

  return (
    <>
      <Landing />
      <About />
      <WhatIDo />
      <Work />
      <Publications />
      <Hackathons />
      {/* <Career /> */}
      <Contact />
    </>
  );
};

const App = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <LoadingProvider>
      {/* Fixed UI lives outside #smooth-content: ScrollSmoother transforms that
          element, which would make position: fixed scroll with the page */}
      <Navbar />
      {isHome && (
        <>
          <Cursor />
          <SocialIcons />
        </>
      )}
      <div id="smooth-wrapper">
        <main id="smooth-content" className="main-body">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      <Analytics />
    </LoadingProvider>
  );
};

export default App;
