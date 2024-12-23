import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import { Star, TrendingUp, Search, Rocket } from "lucide-react";
import "./AboutUs_MIssion.scss";

const features = [
  {
    icon: Star,
    title: "Experience",
    desc: "Leverage our deep expertise and proven track record to overcome business challenges and achieve your strategic objectives.",
    color: "text-warning",
  },
  {
    icon: TrendingUp,
    title: "Results-Driven",
    desc: "Focused on delivering tangible outcomes that optimize efficiency, reduce costs, and accelerate revenue growth.",
    color: "text-success",
  },
  {
    icon: Search,
    title: "Customer Focus",
    desc: "Building lasting partnerships through unwavering commitment to transparency, trust, and mutual success.",
    color: "text-info",
  },
  {
    icon: Rocket,
    title: "Innovation",
    desc: "Pioneering cutting-edge technological solutions to keep you ahead in today's rapidly evolving business landscape.",
    color: "text-primary",
  },
];

const FeaturedItem = ({ feature }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-100"
    >
      <Card className="feature-card h-100 border-0 shadow-sm hover-lift">
        <Card.Body className="d-flex flex-column text-center p-4">
          <div className={`feature-icon mb-3 ${feature.color}`}>
            <feature.icon size={48} strokeWidth={1.5} />
          </div>
          <h4 className="feature-title mb-3">{feature.title}</h4>
          <p className="feature-description text-muted flex-grow-1">
            {feature.desc}
          </p>
          {/* <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-3"
          >
            <a href="#" className="btn btn-outline-primary">
              Learn More
            </a>
          </motion.div> */}
        </Card.Body>
      </Card>
    </motion.div>
  );
};

const AboutUs_3 = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="why-choose-us py-5 bg-light"
    >
      <Container>
        <Row className="justify-content-center text-center mb-5">
          <Col xs={12} md={10} lg={8}>
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="display-5 fw-bold mb-3 text-primary"
            >
              Why Choose Us
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="lead text-muted"
            >
              Elevate your business with our comprehensive ERP solutions
              designed to streamline operations and drive competitive advantage.
            </motion.p>
          </Col>
        </Row>

        <Row className="g-4">
          {features.map((feature, index) => (
            <Col key={index} md={6} lg={3}>
              <FeaturedItem feature={feature} />
            </Col>
          ))}
        </Row>
      </Container>
    </motion.section>
  );
};

export default AboutUs_3;
