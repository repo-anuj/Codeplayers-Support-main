import React, { useEffect } from "react";
import about71 from "../../../assets/images/users/avatar-6.jpg";
import Navbar from "./NavbarPage";
import Footer from "./footer";
import "../../../assets/scss/pages/TeamMember.scss";

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
            <img src={about71} alt="image" className="TeamMember-image" />
            <div className="TeamMember-header">
              <br />
              <h1 className="TeamMember-title">Ritika Agrawal</h1>
              <br />
              <h2 className="TeamMember-subtitle">Design Head</h2>
              <br />
            </div>
          </div>
          <div className="TeamMember-text">
            <p className="TeamMember-paragraph">
              Ritika Agrawal is the creative force behind our company's design
              initiatives, serving as the Design Head. With a keen eye for
              aesthetics and a profound understanding of product and structural
              design, Ritika plays a pivotal role in shaping the visual identity
              and user experience of our products. Her innovative approach and
              attention to detail ensure that our designs not only meet but
              exceed industry standards.
            </p>
            <p className="TeamMember-paragraph">
              As a Consultant for Product and Structural Design, Ritika brings a
              wealth of experience in creating compelling and functional
              designs. She works closely with the product development team to
              conceptualize and execute design strategies that enhance usability
              and visual appeal. Her ability to blend creativity with
              practicality results in designs that are both beautiful and highly
              functional, resonating with users and clients alike.
            </p>
            <p className="TeamMember-paragraph">
              Ritika’s journey in the field of design is marked by her passion
              for creating meaningful and impactful user experiences. She
              possesses a deep understanding of design principles and trends,
              which she leverages to stay ahead in a constantly evolving
              industry. Her leadership in the design department is characterized
              by a collaborative approach, fostering an environment where
              creativity and innovation can flourish.
            </p>
            <p className="TeamMember-paragraph">
              Beyond her professional skills, Ritika is known for her dedication
              to continuous improvement and learning. She actively seeks out new
              design techniques and tools to enhance her craft and inspire her
              team. Her commitment to excellence is reflected in every project
              she undertakes, from initial concept to final execution. Ritika
              Agrawal's expertise and vision make her an invaluable asset to our
              company, driving the design department towards new heights of
              creativity and success.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeamMember;
