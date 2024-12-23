import React from "react";
import { Col, Container, Row } from "reactstrap";

// Import Images
import processArrow from "../../../assets/images/landing/process-arrow-img.png";

const ERPProcess = () => {
  return (
    <React.Fragment>
      <section className="section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="text-center mb-5">
                <h3 className="mb-3 fw-semibold">
                  Our ERP Implementation Process
                </h3>
                <p className="text-muted mb-4 ff-secondary">
                  At CodePlayers, we streamline the Enterprise Resource Planning
                  (ERP) implementation process, ensuring your business achieves
                  optimal efficiency and integration across all departments.
                </p>
              </div>
            </Col>
          </Row>

          <Row className="text-center">
            <Col lg={4}>
              <div className="process-card mt-4">
                <div className="process-arrow-img d-none d-lg-block">
                  <img src={processArrow} alt="" className="img-fluid" />
                </div>
                <div className="avatar-sm icon-effect mx-auto mb-4">
                  <div className="avatar-title bg-transparent text-success rounded-circle h1">
                    <i
                      className="ri-lightbulb-flash-line"
                      style={{ color: "#4b38b3" }}
                    ></i>
                  </div>
                </div>

                <h5>Discovery and Planning</h5>
                <p className="text-muted ff-secondary">
                  We analyze your business processes, identify key requirements,
                  and develop a comprehensive ERP strategy tailored to your
                  organization's needs.
                </p>
              </div>
            </Col>

            <Col lg={4}>
              <div className="process-card mt-4">
                <div className="process-arrow-img d-none d-lg-block">
                  <img src={processArrow} alt="" className="img-fluid" />
                </div>
                <div className="avatar-sm icon-effect mx-auto mb-4">
                  <div className="avatar-title bg-transparent text-success rounded-circle h1">
                    <i
                      className="ri-settings-5-line"
                      style={{ color: "#4b38b3" }}
                    ></i>
                  </div>
                </div>

                <h5>Configuration and Customization</h5>
                <p className="text-muted ff-secondary">
                  Our team configures the ERP system to match your workflows,
                  integrates it with existing systems, and customizes features
                  to meet your specific business requirements.
                </p>
              </div>
            </Col>

            <Col lg={4}>
              <div className="process-card mt-4">
                <div className="avatar-sm icon-effect mx-auto mb-4">
                  <div className="avatar-title bg-transparent text-success rounded-circle h1">
                    <i
                      className="ri-rocket-line"
                      style={{ color: "#4b38b3" }}
                    ></i>
                  </div>
                </div>

                <h5>Deployment and Support</h5>
                <p className="text-muted ff-secondary">
                  We manage the ERP system launch, provide comprehensive
                  training, and offer ongoing support to ensure smooth operation
                  and maximize your return on investment.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default ERPProcess;
