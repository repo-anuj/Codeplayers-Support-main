import React, { useEffect } from "react";
import about3 from "../../../assets/images/users/avatar-2.jpg";
import Navbar from "./NavbarPage";
import Footer from "./footer";
import "../../../assets/scss/pages/TeamMember.scss";

const ManishAgrawal = () => {
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
            <img src={about3} alt="image" className="TeamMember-image" />
            <div className="TeamMember-header">
              <br />
              <h1 className="TeamMember-title">Manish Agrawal</h1>
              <br />
              <h2 className="TeamMember-subtitle">FCA</h2>
              <br />
            </div>
          </div>
          <div className="TeamMember-text">
            <p className="TeamMember-paragraph">
              Manish Agrawal is a seasoned financial expert and a Fellow
              Chartered Accountant (FCA) who brings a wealth of experience and
              knowledge to CodePlayers. As a Consultant specializing in the
              application's financial structure, Manish plays a pivotal role in
              ensuring that the financial aspects of our ERP solutions are
              robust, compliant, and optimized for our clients' needs.
            </p>
            <p className="TeamMember-paragraph">
              With a deep understanding of financial principles and a keen eye
              for detail, Manish excels in designing and implementing financial
              frameworks that enhance the efficiency and accuracy of our
              applications. His expertise in financial structuring ensures that
              our ERP solutions not only meet but exceed industry standards,
              providing our clients with reliable and scalable financial
              management tools.
            </p>
            <p className="TeamMember-paragraph">
              Manish's dedication to excellence and his proactive approach to
              problem-solving make him an invaluable asset to our team. His
              ability to navigate complex financial landscapes and provide
              strategic insights has significantly contributed to the success
              and reliability of CodePlayers' offerings. As a trusted advisor,
              Manish continuously works to refine and improve the financial
              components of our ERP solutions, ensuring that our clients can
              confidently manage their financial operations.
            </p>
            <p className="TeamMember-paragraph">
              His commitment to maintaining the highest standards of financial
              integrity and his passion for innovation drive Manish to deliver
              exceptional results. At CodePlayers, we are proud to have Manish
              Agrawal as part of our team, where his expertise and leadership
              continue to shape the future of our financial solutions.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ManishAgrawal;
