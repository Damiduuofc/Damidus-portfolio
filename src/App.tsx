import "./App.css";
import { LoadingProvider } from "./context/LoadingProvider";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import SocialIcons from "./components/SocialIcons";
import Landing from "./components/Landing";
import About from "./components/About";
import WhatIDo from "./components/WhatIDo";
import Work from "./components/Work";
//import Career from "./components/Career";
import Contact from "./components/Contact";
const App = () => {
  return (
    <LoadingProvider>
      <div id="smooth-wrapper">
        <main id="smooth-content" className="main-body">
          <Cursor />
          <Navbar />
          <SocialIcons />
          <Landing />
          <About />
          <WhatIDo />
          <Work />
              {/* <Career /> */}
          <Contact />
        </main>
      </div>
    </LoadingProvider>
  );
};

export default App;
