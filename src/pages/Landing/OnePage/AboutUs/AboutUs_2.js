import React from "react";
import { Container, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import "./AboutUs_MIssion.scss";

const WorkSteps = [
  {
    step: "01",
    title: "Needs Assessment and Solution Design",
    description:
      "The project team spent the first two months of the engagement thoroughly understanding the client's requirements and designing the ERP solution to meet their specific needs.",
  },
  {
    step: "02",
    title: "Data Migration and Integration",
    description:
      "The data migration and integration with the client's legacy systems was a critical phase that took an additional three months to complete, ensuring the accuracy and reliability of the data in the new ERP system.",
  },
  {
    step: "03",
    title: "Software Implementation and Configuration",
    description:
      "The installation and configuration of the ERP software took approximately four months, during which the team worked closely with the client to ensure a seamless implementation process.",
  },
  {
    step: "04",
    title: "User Training and Go-Live",
    description:
      "The final phase of the project involved comprehensive user training and the official go-live of the ERP system, which took approximately one month to complete.",
  },
];

const AboutUs_2 = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="how-we-work py-5 bg-light"
    >
      <Container>
        <div className="text-center mb-5">
          <motion.h2
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="display-6 fw-bold text-primary mb-3"
          >
            How We Work
          </motion.h2>
          <motion.hr
            initial={{ width: 0 }}
            whileInView={{ width: "10%" }}
            transition={{ duration: 0.5 }}
            className="mx-auto bg-dark opacity-75"
            style={{ height: "3px" }}
          />
        </div>

        <div className="timeline position-relative">
          {WorkSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`timeline-item ${
                index % 2 === 0 ? "timeline-left" : "timeline-right"
              } mb-4`}
            >
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4 position-relative">
                  <div className="step-badge position-absolute">
                    Step <br />
                    <span>{step.step}</span>
                  </div>
                  <div className="ps-5 padding2">
                    <h3 className="h4 text-primary mb-3">{step.title}</h3>
                    <p className="text-muted">
                      <CheckCircle className="me-2 text-success" size={20} />
                      {step.description}
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </motion.section>
  );
};

export default AboutUs_2;
