import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
// Import Images
import logolight from "../../../assets/images/logo-light.png";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="custom-footer bg-dark py-5 position-relative">
        <Container>
          <Row>
            <Col lg={4} className="mt-4">
              <div>
                <div>
                  <img src={logolight} alt="logo light" height="17" />
                </div>
                <div className="mt-4 fs-13">
                  <p>Innovative ERP Solutions for Modern Businesses</p>
                  <p className="ff-secondary">
                    CodePlayers ERP empowers your organization with cutting-edge
                    tools for streamlined operations, enhanced productivity, and
                    data-driven decision making.
                  </p>
                </div>
              </div>
            </Col>

            <Col lg={7} className="ms-lg-auto">
              <Row>
                <Col sm={4} className="mt-4">
                  <h5 className="text-white mb-0">Solutions</h5>
                  <div className="text-muted mt-3">
                    <ul className="list-unstyled ff-secondary footer-list">
                      <li>
                        <Link to="/financial-management">
                          Financial Management
                        </Link>
                      </li>
                      <li>
                        <Link to="/supply-chain">Supply Chain</Link>
                      </li>
                      <li>
                        <Link to="/human-resources">Human Resources</Link>
                      </li>
                      <li>
                        <Link to="/customer-relationship">CRM</Link>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col sm={4} className="mt-4">
                  <h5 className="text-white mb-0">Company</h5>
                  <div className="text-muted mt-3">
                    <ul className="list-unstyled ff-secondary footer-list">
                      <li>
                        <Link to="/about-us">About Us</Link>
                      </li>
                      <li>
                        <Link to="/CaseStudiesPage">Case Studies</Link>
                      </li>
                      <li>
                        <Link to="/partners">Partners</Link>
                      </li>
                      <li>
                        <Link to="/CareerPage">Careers</Link>
                      </li>
                      <li>
                        <Link to="/BlogsPage">Blog</Link>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col sm={4} className="mt-4">
                  <h5 className="text-white mb-0">Legal</h5>
                  <div className="text-muted mt-3">
                    <ul className="list-unstyled ff-secondary footer-list">
                      <li>
                        <Link to="/PrivacyPolicy">Privacy</Link>
                      </li>
                      <li>
                        <Link to="/TermsOfService">T.O.S</Link>
                      </li>
                      <li>
                        <Link to="/FeedBack">FeedBack</Link>
                      </li>
                      <li>
                        <Link to="/Cookies">Cookies</Link>
                      </li>
                      <li>
                        <Link to="/LegalDisclosure">L.D</Link>
                      </li>
                      <li>
                        <Link to="/EULA">E.U.L.A</Link>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="text-center text-sm-start align-items-center mt-5">
            <Col sm={6}>
              <div>
                <p className="copy-rights mb-0">
                  {new Date().getFullYear()} © CodePlayers ERP - All Rights
                  Reserved
                </p>
              </div>
            </Col>
            <Col sm={6}>
              <div className="text-sm-end mt-3 mt-sm-0">
                <ul className="list-inline mb-0 footer-social-link">
                  <li className="list-inline-item">
                    <Link to="#" className="avatar-xs d-block">
                      <div className="avatar-title rounded-circle">
                        <i className="ri-facebook-fill"></i>
                      </div>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#" className="avatar-xs d-block">
                      <div className="avatar-title rounded-circle">
                        <i className="ri-linkedin-fill"></i>
                      </div>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#" className="avatar-xs d-block">
                      <div className="avatar-title rounded-circle">
                        <i className="ri-twitter-fill"></i>
                      </div>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#" className="avatar-xs d-block">
                      <div className="avatar-title rounded-circle">
                        <i className="ri-youtube-fill"></i>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
