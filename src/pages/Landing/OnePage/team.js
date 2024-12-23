import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { motion } from "framer-motion";

// Import Images
import avatar1 from "../../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../../assets/images/users/avatar-5.jpg";
import avatar6 from "../../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../../assets/images/users/avatar-7.png";
import avatar8 from "../../../assets/images/users/avatar-8.jpg";

const teamMembers = [
  {
    id: "UtkarshAgrawal",
    name: "Utkarsh Agrawal",
    role: "Founder & CEO",
    description: "Director: Development & Implementation",
    avatar: avatar1,
    background:
      "Utkarsh Agrawal is the visionary behind our company, serving as the Founder and Chief Executive Officer. With a deep-rooted passion for innovation and technology, Utkarsh has been instrumental in shaping the strategic direction of the company since its inception. His leadership is characterized by a relentless pursuit of excellence and a commitment to delivering value to both customers and stakeholders. As the Director of Development & Implementation, Utkarsh combines his technical expertise with a keen business acumen. He oversees all aspects of the company's development projects, ensuring that each initiative is executed with precision and meets the highest standards of quality. His hands-on approach and ability to navigate complex challenges have been pivotal in driving the company growth and success.",
    education: "MBA, Technology Management",
    expertise: [
      "Strategic Planning",
      "Product Development",
      "Technology Innovation",
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/utkarsh-agrawal",
      twitter: "https://twitter.com/utkarsh_agrawal",
      email: "utkarsh.agrawal@company.com",
    },
  },
  {
    id: "ManasAgrawal",
    name: "Manas Agrawal",
    role: "Co-Founder",
    description: "Director: Sales",
    avatar: avatar8,
    background:
      "Manas Agrawal, Co-Founder and Director of Sales at CodePlayers, is pivotal in driving the company's success. He is responsible for devising and executing sales strategies that align with the company's overall business goals. This includes conducting thorough market research to identify emerging trends and opportunities, developing strategic sales plans, and setting ambitious yet achievable sales targets. Building and maintaining strong relationships with key clients and partners is also central to his role, which is essential for sustained business growth. In his management of the sales department, Manas provides comprehensive training and support to his team, fostering a collaborative and results-driven culture. He uses data analytics to track performance metrics, assess team performance, and implement necessary improvements. His leadership ensures that the sales team is motivated, well-equipped, and aligned with the company's vision, contributing to the overall success of the department.",
    education: "Master of Commerce",
    expertise: ["Sales Strategy", "Business Development", "Client Relations"],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/manas-agrawal",
      twitter: "https://twitter.com/manas_agrawal",
      email: "manas.agrawal@company.com",
    },
  },
  {
    id: "ManishAgrawal",
    name: "CA Manish Agrawal",
    role: "FCA",
    description: "Consultant: Application's Financial Structure",
    avatar: avatar2,
    background:
      "Manish Agrawal is a seasoned financial expert and a Fellow Chartered Accountant (FCA) who brings a wealth of experience and knowledge to CodePlayers. As a Consultant specializing in the application's financial structure, Manish plays a pivotal role in ensuring that the financial aspects of our ERP solutions are robust, compliant, and optimized for our clients' needs. With a deep understanding of financial principles and a keen eye for detail, Manish excels in designing and implementing financial frameworks that enhance the efficiency and accuracy of our applications. His expertise in financial structuring ensures that our ERP solutions not only meet but exceed industry standards, providing our clients with reliable and scalable financial management tools.",
    education: "Fellow Chartered Accountant (FCA)",
    expertise: ["Financial Planning", "Risk Management", "Corporate Finance"],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/manish-agrawal-fca",
      twitter: "https://twitter.com/manish_agrawal",
      email: "manish.agrawal@company.com",
    },
  },
  {
    id: "HarshitGoel",
    name: "Harshit Goel",
    role: "B-Tech (Computer Science)",
    description: "Consultant: Application's Development",
    avatar: avatar3,
    background:
      "Harshit Goel is a skilled application development consultant at CodePlayers, holding a B-Tech degree in Computer Science. He excels in designing, developing, and implementing software applications, leveraging his knowledge of programming languages and development frameworks to enhance ERP systems' efficiency and functionality. Harshit collaborates with cross-functional teams to create user-friendly, scalable applications that meet industry standards His strong background in Computer Science provides him with a deep understanding of algorithms, data structures, and software engineering principles. Harshit has led multiple projects, solving complex technical problems and delivering high-quality software solutions. His ability to communicate effectively with both technical and non-technical stakeholders ensures clear understanding and fulfillment of project requirements.",
    education: "B.Tech, Computer Science",
    expertise: [
      "Software Architecture",
      "Full Stack Development",
      "Tech Innovation",
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/harshit-goel",
      twitter: "https://twitter.com/harshit_goel",
      email: "harshit.goel@company.com",
    },
  },
  {
    id: "AditiAgrawal",
    name: "Aditi Agrawal",
    role: "BE (Computer Science)",
    description: "Consultant: Application's Development",
    avatar: avatar4,
    background:
      "Aditi Agrawal, holding a BE degree in Computer Science, is a skilled professional specializing in application development at CodePlayers. As a Consultant in Application Development, she manages the end-to-end development of software applications, focusing on intuitive and efficient solutions. Aditi collaborates closely with clients and internal teams to understand requirements and ensure seamless ERP system implementations Her educational background provides a solid foundation in software engineering principles, algorithms, and data structures. Aditi has successfully tackled complex technical challenges across numerous projects, delivering high-quality software solutions. Her analytical skills and effective communication enable her to align technical requirements with business objectives.",
    education: "Bachelor of Engineering, Computer Science",
    expertise: [
      "UI/UX Design",
      "Mobile App Development",
      "Software Engineering",
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/aditi-agrawal",
      twitter: "https://twitter.com/aditi_agrawal",
      email: "aditi.agrawal@company.com",
    },
  },
  {
    id: "ArpitAgrawal",
    name: "Arpit Agrawal",
    role: "M.Tech (IIT Kharagpur)",
    description: "Consultant: Business Development",
    avatar: avatar5,
    background:
      "Arpit Agrawal is a strategic and insightful professional specializing in business development, holding an M.Tech degree from IIT Kharagpur. With a strong academic foundation and extensive expertise in business strategy, Arpit is a pivotal member of the CodePlayers team, driving growth and market expansion. As a Consultant in Business Development, Arpit is responsible for identifying and seizing new business opportunities, fostering client relationships, and enhancing CodePlayers' market presence. He collaborates closely with the sales and marketing teams to devise and implement strategies that give the company a competitive edge. His role involves thorough market analysis, understanding client needs, and developing customized solutions that align with business goals. Arpit's strategic approach ensures that CodePlayers stays ahead in the dynamic ERP market.",
    education: "M.Tech, IIT Kharagpur",
    expertise: [
      "Business Strategy",
      "Market Expansion",
      "Innovation Management",
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/arpit-agrawal",
      twitter: "https://twitter.com/arpit_agrawal",
      email: "arpit.agrawal@company.com",
    },
  },
  {
    id: "IleshThakkar",
    name: "Ilesh Thakkar",
    role: "Business Head",
    description: "Consultant: Business Development, Implementation and Support",
    avatar: avatar7,
    background:
      "Ilesh Thakkar serves as the Business Head of our company, bringing a wealth of expertise in business development, implementation, and support. With a robust background in consultancy, Ilesh has played a critical role in driving our company's strategic initiatives and ensuring the successful execution of business plans. His ability to identify growth opportunities and streamline operations has been instrumental in enhancing our market presence and expanding our client base In his role as a Consultant for Business Development, Implementation, and Support, Ilesh combines strategic vision with practical execution. He works closely with various teams to develop and implement strategies that align with the company's goals. His insights and experience are invaluable in guiding projects from inception to completion, ensuring that they meet client needs and exceed expectations. His hands-on approach and attention to detail have earned him a reputation for excellence and reliability.",
    education: "MBA, Business Administration",
    expertise: [
      "Business Operations",
      "Strategic Partnerships",
      "Customer Success",
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/ilesh-thakkar",
      twitter: "https://twitter.com/ilesh_thakkar",
      email: "ilesh.thakkar@company.com",
    },
  },
  {
    id: "RitikaAgrawal",
    name: "Ritika Agrawal",
    role: "Design Head",
    description: "Consultant: Product & Structural Design",
    avatar: avatar6,
    background:
      "Ritika Agrawal is the creative force behind our company's design initiatives, serving as the Design Head. With a keen eye for aesthetics and a profound understanding of product and structural design, Ritika plays a pivotal role in shaping the visual identity and user experience of our products. Her innovative approach and attention to detail ensure that our designs not only meet but exceed industry standards. As a Consultant for Product and Structural Design, Ritika brings a wealth of experience in creating compelling and functional designs. She works closely with the product development team to conceptualize and execute design strategies that enhance usability and visual appeal. Her ability to blend creativity with practicality results in designs that are both beautiful and highly functional, resonating with users and clients alike.",
    education: "Bachelor of Design",
    expertise: ["Product Design", "User Experience", "Visual Branding"],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/ritika-agrawal",
      twitter: "https://twitter.com/ritika_agrawal",
      email: "ritika.agrawal@company.com",
      behance: "https://www.behance.net/ritika-agrawal",
    },
  },
];

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const openMemberModal = (member) => {
    setSelectedMember(member);
  };

  const closeMemberModal = () => {
    setSelectedMember(null);
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="team-section bg-light py-5"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Row className="justify-content-center mb-5">
            <Col lg={10} className="text-center">
              <h2 className="display-5 mb-4">
                Meet Our <span className="text-primary">Exceptional Team</span>
              </h2>
              <p className="lead text-muted">
                A diverse group of innovators, strategists, and experts
                committed to driving technological excellence and business
                growth.
              </p>
            </Col>
          </Row>
        </motion.div>

        {/* Team Members Grid */}
        <Row className="g-4">
          {teamMembers.map((member) => (
            <Col key={member.id} lg={3} md={4} sm={6} xs={12}>
              <motion.div variants={cardVariants} whileHover="hover">
                <Card
                  className="team-card h-100 border-0 shadow-sm transform-on-hover"
                  onClick={() => openMemberModal(member)}
                >
                  <div className="card-body text-center p-4 bg-none !important">
                    <div className="mb-4 position-relative">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="img-fluid rounded-circle mb-3 team-avatar"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                          border: "4px solid #007bff",
                        }}
                      />
                      <div
                        className="badge bg-primary position-absolute"
                        style={{
                          bottom: "10px",
                          right: "50%",
                          transform: "translateX(50%)",
                        }}
                      >
                        {member.role}
                      </div>
                    </div>
                    <h5 className="mb-2">{member.name}</h5>
                    <p className="text-muted small">{member.description}</p>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Member Details Modal */}
        {selectedMember && (
          <Modal
            isOpen={!!selectedMember}
            toggle={closeMemberModal}
            centered
            size="lg"
            className="modal-responsive"
          >
            <ModalHeader toggle={closeMemberModal}>
              <h4 className="modal-title mb-0">{selectedMember.name}</h4>
            </ModalHeader>
            <ModalBody className="p-4">
              <Row className="g-4">
                <Col xs={12} md={4} className="text-center">
                  <div className="sticky-top" style={{ top: "1rem" }}>
                    <img
                      src={selectedMember.avatar}
                      alt={selectedMember.name}
                      className="img-fluid rounded-circle mb-3"
                      style={{
                        width: "160px",
                        height: "160px",
                        objectFit: "cover",
                        border: "4px solid #007bff",
                        maxWidth: "100%",
                      }}
                    />
                    <h5 className="mb-2">{selectedMember.name}</h5>
                    <p className="text-muted mb-3">{selectedMember.role}</p>

                    {/* Social Links */}
                    <div className="social-links d-flex flex-wrap justify-content-center gap-2 mb-4">
                      {Object.entries(selectedMember.socialLinks).map(
                        ([platform, link]) => (
                          <a
                            key={platform}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-primary btn-sm"
                          >
                            {platform.charAt(0).toUpperCase() +
                              platform.slice(1)}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </Col>
                <Col xs={12} md={8}>
                  <div className="member-details">
                    <h6 className="text-primary mb-3">About</h6>
                    <p className="mb-4">{selectedMember.background}</p>

                    {/* <h6 className="text-primary mb-3">Education</h6>
                    <p className="mb-4">{selectedMember.education}</p>

                    <h6 className="text-primary mb-3">Areas of Expertise</h6>
                    <div className="d-flex flex-wrap gap-2 mb-4">
                      {selectedMember.expertise.map((skill, index) => (
                        <span
                          key={index}
                          className="badge bg-light text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div> */}
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
        )}
      </Container>

      {/* Add these styles to your CSS */}
      <style>
        {`
          @media (max-width: 767px) {
            .modal-responsive {
              margin: 1rem;
              max-width: calc(100% - 2rem);
            }
            
            .modal-responsive .modal-body {
              padding: 1rem !important;
            }
            
            .modal-responsive .member-details {
              margin-top: 2rem;
            }
            
            .social-links {
              margin-bottom: 2rem;
            }
            
            .modal-responsive .sticky-top {
              position: relative;
              top: 0;
              padding-bottom: 1rem;
              border-bottom: 1px solid #dee2e6;
            }
          }
          
          .member-details h6 {
            font-weight: 600;
          }
          
          .badge {
            padding: 0.5rem 1rem;
            font-weight: 500;
          }
          
          .modal-responsive .modal-content {
            border-radius: 1rem;
            border: none;
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
          }
          
          .transform-on-hover {
            transition: transform 0.3s ease;
            cursor: pointer;
          }
          
          .transform-on-hover:hover {
            transform: translateY(-5px);
          }
        `}
      </style>
    </motion.div>
  );
};

export default Team;
