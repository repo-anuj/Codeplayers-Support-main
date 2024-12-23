import React, { useEffect } from "react";
import about1 from "../../../assets/images/users/avatar-1.jpg";
import "./About.css";
import Navbar from "./NavbarPage";
import Footer from "./footer";
import "../../../assets/scss/pages/TeamMember.scss";

const UtkarshAgrawal = () => {
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="TeamMember-container">
        <div className="TeamMember-content">
          <div className="TeamMember-image-container">
            <img
              src={about1}
              alt="Utkarsh Agrawal"
              className="TeamMember-image"
            />
            <div className="TeamMember-header">
              <br />
              <h1 className="TeamMember-title">Utkarsh Agrawal</h1>
              <br />
              <h2 className="TeamMember-subtitle">Founder & CEO</h2>
              <br />
            </div>
          </div>
          <div className="TeamMember-text">
            <p className="TeamMember-paragraph">
              Utkarsh Agrawal is the visionary behind our company, serving as
              the Founder and Chief Executive Officer. With a deep-rooted
              passion for innovation and technology, Utkarsh has been
              instrumental in shaping the strategic direction of the company
              since its inception. His leadership is characterized by a
              relentless pursuit of excellence and a commitment to delivering
              value to both customers and stakeholders.
            </p>
            <p className="TeamMember-paragraph">
              As the Director of Development & Implementation, Utkarsh combines
              his technical expertise with a keen business acumen. He oversees
              all aspects of the company's development projects, ensuring that
              each initiative is executed with precision and meets the highest
              standards of quality. His hands-on approach and ability to
              navigate complex challenges have been pivotal in driving the
              company's growth and success.
            </p>
            <p className="TeamMember-paragraph">
              Utkarsh's journey into entrepreneurship is marked by a strong
              educational background and a wealth of experience in the industry.
              He has continuously demonstrated his ability to lead dynamic
              teams, foster innovation, and build lasting relationships with
              clients and partners. Under his guidance, the company has achieved
              significant milestones and is poised for continued success in the
              years to come.
            </p>
            <p className="TeamMember-paragraph">
              Beyond his professional achievements, Utkarsh is known for his
              dedication to fostering a positive and inclusive company culture.
              He believes in empowering his team, encouraging creativity, and
              nurturing an environment where everyone can thrive. His vision,
              combined with his unwavering commitment to excellence, makes
              Utkarsh Agrawal a driving force behind our company's ongoing
              journey towards innovation and growth.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UtkarshAgrawal;
