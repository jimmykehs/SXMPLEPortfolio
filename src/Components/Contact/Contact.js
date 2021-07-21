import React from "react";
import { Email, Insta, Twitter } from "../../SiteImg";
import "./Contact.css";

const Contact = () => {
  return (
    <section id="Contact" className="Section">
      <h1>Contact Us!</h1>
      <div className="Social-Media">
        <a href="https://www.instagram.com/sxmplestudios/">
          <img src={Insta} alt="Instagram Link" />
        </a>
        <a href="https://twitter.com/SxmpleStudios">
          <img src={Twitter} alt="Twitter Link" />
        </a>
        <a href="mailto: groupsxmple@gmail.com">
          <img src={Email} alt="Email Link" />
        </a>
      </div>
    </section>
  );
};

export default Contact;
