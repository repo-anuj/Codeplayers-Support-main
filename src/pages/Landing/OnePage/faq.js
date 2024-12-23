import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Collapse,
} from "reactstrap";
import { Plus, Minus } from "lucide-react";
import "./FAQ.css";

const FAQ = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      setOpenAccordion(null);
    }
  };

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const generalQuestions = [
    {
      id: "g1",
      question: "What is ERP and how can it benefit my business?",
      answer:
        "ERP (Enterprise Resource Planning) is a comprehensive software system that integrates and automates various business processes, such as accounting, inventory management, supply chain, and human resources, into a single platform. By implementing an ERP system, businesses can benefit from increased efficiency, improved data accuracy, better decision-making, and enhanced collaboration across different departments.",
    },
    {
      id: "g2",
      question: "How long does it typically take to implement an ERP system?",
      answer:
        "The implementation timeline can vary depending on the size and complexity of your organization, the ERP system being implemented, and the scope of the project. On average, a successful ERP implementation can take 6 to 12 months, with larger enterprises potentially requiring 12 to 18 months.",
    },
    {
      id: "g3",
      question: "How long does it typically take to implement an ERP system?",
      answer:
        "The implementation timeline can vary depending on the size and complexity of your organization, the ERP system being implemented, and the scope of the project. On average, a successful ERP implementation can take 6 to 12 months, with larger enterprises potentially requiring 12 to 18 months.",
    },
    {
      id: "g4",
      question: "How long does it typically take to implement an ERP system?",
      answer:
        "The implementation timeline can vary depending on the size and complexity of your organization, the ERP system being implemented, and the scope of the project. On average, a successful ERP implementation can take 6 to 12 months, with larger enterprises potentially requiring 12 to 18 months.",
    },
  ];

  const securityQuestions = [
    {
      id: "s1",
      question: "How secure is your ERP system?",
      answer:
        "Our ERP system employs industry-standard security protocols including end-to-end encryption, regular security audits, and multi-factor authentication. We comply with all major security standards and regularly update our security measures.",
    },
    {
      id: "s2",
      question: "What measures are in place to protect sensitive data?",
      answer:
        "We implement multiple layers of security including data encryption at rest and in transit, regular backups, access controls, and audit logging. All data is stored in secure, certified data centers with redundant systems.",
    },
    {
      id: "s3",
      question: "What measures are in place to protect sensitive data?",
      answer:
        "We implement multiple layers of security including data encryption at rest and in transit, regular backups, access controls, and audit logging. All data is stored in secure, certified data centers with redundant systems.",
    },
    {
      id: "s4",
      question: "What measures are in place to protect sensitive data?",
      answer:
        "We implement multiple layers of security including data encryption at rest and in transit, regular backups, access controls, and audit logging. All data is stored in secure, certified data centers with redundant systems.",
    },
  ];

  return (
    <div className="faq-section py-5">
      <Container>
        <Row className="justify-content-center mb-5">
          <Col lg={8} className="text-center">
            <h2 className="display-4 mb-4 fw-bolder text-blue-600">FAQ</h2>
            <p className="lead text-muted">
              Find answers to common questions about our ERP solutions
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={8}>
            <Nav tabs className="faq-tabs mb-4 justify-content-center">
              <NavItem>
                <NavLink
                  className={`tab-link ${activeTab === "1" ? "active" : ""}`}
                  onClick={() => toggleTab("1")}
                >
                  General Questions
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={`tab-link ${activeTab === "2" ? "active" : ""}`}
                  onClick={() => toggleTab("2")}
                >
                  Security & Privacy
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeTab}>
              <TabPane tabId="1" className="fade-slide">
                <div className="accordion-wrapper">
                  {generalQuestions.map((item) => (
                    <div key={item.id} className="faq-item mb-3">
                      <div
                        className={`faq-question ${
                          openAccordion === item.id ? "active" : ""
                        }`}
                        onClick={() => toggleAccordion(item.id)}
                      >
                        <span>{item.question}</span>
                        {openAccordion === item.id ? (
                          <Minus className="icon" size={20} />
                        ) : (
                          <Plus className="icon" size={20} />
                        )}
                      </div>
                      <Collapse isOpen={openAccordion === item.id}>
                        <div className="faq-answer p-3">{item.answer}</div>
                      </Collapse>
                    </div>
                  ))}
                </div>
              </TabPane>
              <TabPane tabId="2" className="fade-slide">
                <div className="accordion-wrapper">
                  {securityQuestions.map((item) => (
                    <div key={item.id} className="faq-item mb-3">
                      <div
                        className={`faq-question ${
                          openAccordion === item.id ? "active" : ""
                        }`}
                        onClick={() => toggleAccordion(item.id)}
                      >
                        <span>{item.question}</span>
                        {openAccordion === item.id ? (
                          <Minus className="icon" size={20} />
                        ) : (
                          <Plus className="icon" size={20} />
                        )}
                      </div>
                      <Collapse isOpen={openAccordion === item.id}>
                        <div className="faq-answer p-3">{item.answer}</div>
                      </Collapse>
                    </div>
                  ))}
                </div>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FAQ;
