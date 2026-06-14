import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-container">
        {/* Left Side: Image */}
        <div className="about-image-container">
          <img src="/LaptopChad.png" alt="Profile" className="about-image" />
        </div>

{/* Right Side: Text Content */}
<div className="about-me">
  <h3 className="title">About Me</h3>
  {/* Inline styles removed so the CSS media queries work properly */}
  <p className="para">
    Information Systems undergraduate passionate about full-stack
    development, UI/UX design, and building modern digital experiences.
    I enjoy creating scalable web applications with React, Next.js,
    Node.js, and MongoDB while continuously exploring new technologies
    and design trends.
  </p>
</div>
      </div>
    </div>
  );
};

export default About;