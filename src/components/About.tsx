import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-container">
        {/* Left Side: Image */}
        <div className="about-image-container" data-reveal="image">
          <img
            src="/images/about-laptop.webp"
            alt="Illustrated avatar of Damidu Abeysinghe coding on a laptop"
            className="about-image"
            width={1100}
            height={1122}
            loading="lazy"
          />
        </div>

{/* Right Side: Text Content */}
<div className="about-me" data-reveal="children">
  <h2 className="title">About Me</h2>
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