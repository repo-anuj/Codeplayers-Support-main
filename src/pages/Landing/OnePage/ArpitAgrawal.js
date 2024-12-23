import React, { useEffect } from "react";
import about6 from "../../../assets/images/users/avatar-5.jpg";
import Footer from "./footer";
import Navbar from "./NavbarPage";
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
      <div className="TeamMember-page">
        <div className="TeamMember-container">
          <div className="TeamMember-content">
            <div className="TeamMember-image-container">
              <img
                src={about6}
                alt="Arpit Agrawal"
                className="TeamMember-image"
              />
              <div className="TeamMember-header">
                <h1 className="TeamMember-title">Arpit Agrawal</h1>
                <h2 className="TeamMember-subtitle">M.Tech (IIT Kharagpur)</h2>
              </div>
            </div>
            <div className="TeamMember-text">
              <p className="TeamMember-paragraph">
                Arpit Agrawal is a strategic and insightful professional
                specializing in business development, holding an M.Tech degree
                from IIT Kharagpur. With a strong academic foundation and
                extensive expertise in business strategy, Arpit is a pivotal
                member of the CodePlayers team, driving growth and market
                expansion.
              </p>
              <p className="TeamMember-paragraph">
                As a Consultant in Business Development, Arpit is responsible
                for identifying and seizing new business opportunities,
                fostering client relationships, and enhancing CodePlayers'
                market presence. He collaborates closely with the sales and
                marketing teams to devise and implement strategies that give the
                company a competitive edge. His role involves thorough market
                analysis, understanding client needs, and developing customized
                solutions that align with business goals. Arpit’s strategic
                approach ensures that CodePlayers stays ahead in the dynamic ERP
                market.
              </p>
              <p className="TeamMember-paragraph">
                Arpit’s academic journey at IIT Kharagpur provided him with a
                strong foundation in engineering principles and business
                strategies. His experience spans various industries, where he
                has successfully spearheaded business development initiatives
                and driven significant revenue growth. With a blend of technical
                knowledge and business acumen, Arpit excels in creating and
                executing strategies that propel company growth. His ability to
                analyze market trends and build strong client relationships has
                been a key factor in his professional success.
              </p>
              <p className="TeamMember-paragraph">
                Arpit has a track record of leading successful business
                development campaigns, resulting in substantial market share
                increases and new client acquisitions for CodePlayers. His
                innovative strategies and keen insights have secured
                high-profile partnerships, expanding the company's footprint in
                the industry. Arpit’s dedication and expertise in business
                development have been recognized with several industry awards
                and accolades. His strategic contributions have played a crucial
                role in positioning CodePlayers as a leader in the ERP solutions
                market.
              </p>
              <p className="TeamMember-paragraph">
                Arpit Agrawal’s strategic vision, business acumen, and
                commitment to excellence make him an invaluable member of the
                CodePlayers team. His efforts in driving business development
                and forging strong client relationships contribute significantly
                to the company's long-term success and market leadership.
              </p>
              {/* Rest of the text paragraphs */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeamMember;
