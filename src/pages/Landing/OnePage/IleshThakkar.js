import React, { useEffect } from "react";
import about7 from "../../../assets/images/users/avatar-7.png";
import Navbar from "./NavbarPage";
import Footer from "./footer";

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
            <img src={about7} alt="image" className="TeamMember-image" />
            <div className="TeamMember-header"></div>
            <br />
            <h1 className="TeamMember-title">Ilesh Thakkar</h1>
            <br />
            <h2 className="TeamMember-subtitle">Business Head</h2>
            <br />
          </div>
          <div className="TeamMember-text">
            <p className="TeamMember-paragraph">
              Ilesh Thakkar serves as the Business Head of our company, bringing
              a wealth of expertise in business development, implementation, and
              support. With a robust background in consultancy, Ilesh has played
              a critical role in driving our company’s strategic initiatives and
              ensuring the successful execution of business plans. His ability
              to identify growth opportunities and streamline operations has
              been instrumental in enhancing our market presence and expanding
              our client base
            </p>
            <p className="TeamMember-paragraph">
              In his role as a Consultant for Business Development,
              Implementation, and Support, Ilesh combines strategic vision with
              practical execution. He works closely with various teams to
              develop and implement strategies that align with the company’s
              goals. His insights and experience are invaluable in guiding
              projects from inception to completion, ensuring that they meet
              client needs and exceed expectations. His hands-on approach and
              attention to detail have earned him a reputation for excellence
              and reliability.
            </p>
            <p className="TeamMember-paragraph">
              Ilesh’s leadership is characterized by his proactive
              problem-solving skills and his dedication to fostering strong
              client relationships. He is adept at navigating complex business
              environments and possesses a keen understanding of market
              dynamics. This allows him to provide tailored solutions that drive
              growth and deliver tangible results. His strategic mindset and
              operational acumen make him a vital asset to our team.
            </p>
            <p className="TeamMember-paragraph">
              Beyond his professional achievements, Ilesh is committed to
              continuous learning and professional development. He is known for
              his ability to inspire and mentor his colleagues, fostering a
              collaborative and dynamic work environment. His dedication to
              excellence and his passion for driving business success are
              evident in every aspect of his work. Under Ilesh Thakkar's
              leadership, our company continues to achieve new milestones and
              set higher standards in the industry.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeamMember;
