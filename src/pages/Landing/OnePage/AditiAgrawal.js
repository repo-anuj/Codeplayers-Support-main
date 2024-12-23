import React, { useEffect } from "react";
import about5 from "../../../assets/images/users/avatar-4.jpg";
import Footer from "./footer";
import Navbar from "./NavbarPage";
// import "../../../assets/scss/pages/TeamMember.scss";

const TeamMember = () => {
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="TeamMember-content">
          <div className="TeamMember-image-container">
            <img src={about5} alt="image" className="TeamMember-image" />
            <div className="TeamMember-header">
              <br />
              <h1 className="TeamMember-title">Aditi Agrawal</h1>
              <br />
              <h2 className="TeamMember-subtitle">BE (Computer Science)</h2>
              <br />
            </div>
          </div>
          <div className="TeamMember-text">
            <p className="TeamMember-paragraph">
              Aditi Agrawal, holding a BE degree in Computer Science, is a
              skilled professional specializing in application development at
              CodePlayers. As a Consultant in Application Development, she
              manages the end-to-end development of software applications,
              focusing on intuitive and efficient solutions. Aditi collaborates
              closely with clients and internal teams to understand requirements
              and ensure seamless ERP system implementations
            </p>
            <p className="TeamMember-paragraph">
              Her educational background provides a solid foundation in software
              engineering principles, algorithms, and data structures. Aditi has
              successfully tackled complex technical challenges across numerous
              projects, delivering high-quality software solutions. Her
              analytical skills and effective communication enable her to align
              technical requirements with business objectives.
            </p>
            <p className="TeamMember-paragraph">
              Aditi has significantly contributed to the successful delivery of
              critical applications, improving operational efficiency and user
              experience for clients. Her innovative solutions and commitment to
              excellence have earned recognition from both peers and clients,
              enhancing CodePlayers' ERP projects.
            </p>
            <p className="TeamMember-paragraph">
              Passionate about technology, Aditi continuously updates her skills
              and experiments with new tools and technologies. In her free time,
              she participates in coding competitions and tech meetups. Her
              hobbies include traveling and exploring new cultures, which
              inspire her work. Aditi's expertise and dedication make her a
              valuable member of the CodePlayers team, driving innovation and
              ensuring client satisfaction.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeamMember;
