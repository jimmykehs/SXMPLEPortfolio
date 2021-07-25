import React from "react";
import Collage from "./Collage/Collage";
import "./About.css";

const About = () => {
  return (
    <section id="About" className="Section">
      <Collage />
      <div className="About-Details">
        <h1>About Us</h1>
        <p>
          SXMPLE Studios is a small game development group originated by the
          Microsoft New Orleans Game Camp in Fall 2020. We are a learning and
          growing group mostly comprised of college kids. Our team’s knowledge
          and experience of game development started at almost nothing, but over
          our team’s lifespan we have developed and grown our way into making
          small indie games and had much fun doing so.
        </p>
      </div>
    </section>
  );
};

export default About;
