import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import Grow from "../../../../assets/images/landing/about us/GrowPNG.png";
import "./AboutUs_MIssion.scss";

const AboutUs_1 = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="about-us_1 py-5 bg-light"
    >
      <Container>
        <Card className="border-0 shadow-lg overflow-hidden">
          <Row className="g-0 align-items-center">
            {/* Text Content Column */}
            <Col md={6} lg={7} className="p-4 p-md-5">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h2 className="display-6 fw-bold mb-4 text-primary">
                  Embracing Challenges, Delivering Solutions
                </h2>

                <div className="mb-4">
                  <div className="d-flex align-items-start mb-3">
                    <i className="bi bi-check-circle-fill text-success me-3 fs-4"></i>
                    <p className="text-muted">
                      100% Commitment to Efficient Problem Resolution
                    </p>
                  </div>

                  <div className="d-flex align-items-start mb-3">
                    <i className="bi bi-gear-fill text-primary me-3 fs-4"></i>
                    <p className="text-muted">
                      Open to Product Improvement Suggestions
                    </p>
                  </div>

                  <div className="d-flex align-items-start">
                    <i className="bi bi-graph-up text-warning me-3 fs-4"></i>
                    <p className="text-muted">
                      Comprehensive ERP Solutions for Operational Efficiency
                    </p>
                  </div>
                </div>

                {/* <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary px-4 py-2 rounded-pill"
                >
                  Learn More
                </motion.button> */}
              </motion.div>
            </Col>

            {/* Image Column */}
            <Col md={6} lg={5} className="d-none d-md-block">
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={Grow}
                alt="Growth Illustration"
                className="img-fluid rounded-end"
              />
            </Col>
          </Row>
        </Card>
      </Container>
    </motion.section>
  );
};

export default AboutUs_1;
