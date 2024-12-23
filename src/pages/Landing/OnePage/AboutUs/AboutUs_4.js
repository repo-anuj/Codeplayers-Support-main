import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  TruckIcon,
  FileText,
  Barcode,
  Settings2,
  Users,
  Phone,
} from "lucide-react";
import PropTypes from "prop-types";
import "./AboutUs_MIssion.scss";

const contents = [
  {
    title: "Fleet Management",
    text: "Access comprehensive and detailed information about your fleet for better decision-making.",
    icon: TruckIcon,
  },
  {
    title: "Streamlined Compliance",
    text: "Enjoy seamless API integration with GST, TDS, and TCS for effortless compliance management.",
    icon: FileText,
  },
  {
    title: "Intelligent Reporting",
    text: "Stay informed with seamless WhatsApp integration and comprehensive MIS reports.",
    icon: Barcode,
  },
  {
    title: "Highly Customizable",
    text: "Tailor our solutions to your unique business needs for maximum efficiency and productivity.",
    icon: Settings2,
  },
  {
    title: "Automated Party Management",
    text: "Streamline your party master creation using GSTN for seamless business operations.",
    icon: Users,
  },
  {
    title: "Intuitive User Experience",
    text: "Enjoy a user-friendly interface that's as easy to navigate as your smartphone.",
    icon: Phone,
  },
];

const ContentItem = ({ item, index }) => {
  const IconComponent = item.icon;

  return (
    <Col md={6} lg={4} className="mb-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: index * 0.2,
        }}
        viewport={{ once: true }}
      >
        <Card className="h-100 border-0 shadow-sm hover-lift">
          <Card.Body className="text-center p-4">
            <motion.div
              className="mb-3 d-flex justify-content-center align-items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="feature-icon mb-3">
                <IconComponent
                  size={48}
                  className="text-primary"
                  strokeWidth={1.5}
                />
              </div>
            </motion.div>
            <div className="feature-content">
              <motion.h5
                className="card-title mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.3 }}
              >
                {item.title}
              </motion.h5>
              <motion.p
                className="card-text text-muted"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.4 }}
              >
                {item.text}
              </motion.p>
            </div>
          </Card.Body>
        </Card>
      </motion.div>
    </Col>
  );
};

ContentItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

const AboutUs_4 = () => {
  return (
    <motion.section
      className="ezy__howitworks3 py-5"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Row className="justify-content-center text-center mb-5">
            <Col xl={8} lg={10}>
              <h1 className="ezy__howitworks3-heading text-primary display-4 mb-3">
                Streamline Your Automation Needs
              </h1>
              <p className="ezy__howitworks3-sub-heading lead text-muted">
                Unlock the full potential of your business with our cutting-edge
                automation solutions. Seamless integrations, unparalleled
                support, and customizable options - we've got you covered.
              </p>
            </Col>
          </Row>
        </motion.div>

        <Row>
          {contents.map((item, index) => (
            <ContentItem key={item.title} item={item} index={index} />
          ))}
        </Row>
      </Container>
    </motion.section>
  );
};

export default AboutUs_4;
