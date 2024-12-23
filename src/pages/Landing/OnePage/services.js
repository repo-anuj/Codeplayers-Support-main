import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

const Services = () => {
  return (
    <React.Fragment>
      <section className="section" id="services">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="text-center mb-5">
                <h1 className="mb-3 ff-secondary fw-semibold lh-base">
                  Our Features
                </h1>
                <p className="text-muted">
                  We've learned from customer experience and work back towards
                  the technology
                </p>
              </div>
            </Col>
          </Row>

          <Row className="g-3">
            <Col lg={4}>
              <div className="d-flex p-3">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm icon-effect">
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i
                        className="ri-flow-chart fs-36"
                        style={{ color: "#4b38b3" }}
                      ></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-18">Streamlined Operations</h5>
                  <p className="text-muted my-3 ff-secondary">
                    Integrate processes into one system, eliminating
                    redundancies, boosting efficiency, reducing costs, and
                    improving productivity.
                  </p>
                  <div>
                    <Link to="#" className="fs-13 fw-medium">
                      Learn More{" "}
                      <i className="ri-arrow-right-s-line align-bottom"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={4}>
              <div className="d-flex p-3">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm icon-effect">
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i
                        className="ri-link fs-36"
                        style={{ color: "#4b38b3" }}
                      ></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-18">Seamless Integration</h5>
                  <p className="text-muted my-3 ff-secondary">
                    Our ERP systems integrate smoothly with your current
                    software and hardware, minimizing operational disruption.
                  </p>
                  <div>
                    <Link to="#" className="fs-13 fw-medium">
                      Learn More{" "}
                      <i className="ri-arrow-right-s-line align-bottom"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={4}>
              <div className="d-flex p-3">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm icon-effect">
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i
                        className="ri-bar-chart-box-line fs-36"
                        style={{ color: "#4b38b3" }}
                      ></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-18">Real-Time Data for Better Decisions</h5>
                  <p className="text-muted my-3 ff-secondary">
                    Access real-time data and analytics to make quick, informed
                    decisions with accurate, up-to-date information.
                  </p>
                  <div>
                    <Link to="#" className="fs-13 fw-medium">
                      Learn More{" "}
                      <i className="ri-arrow-right-s-line align-bottom"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={4}>
              <div className="d-flex p-3">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm icon-effect">
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i
                        className="ri-scales-3-line fs-36"
                        style={{ color: "#4b38b3" }}
                      ></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-18">Scalable Solutions for Growth</h5>
                  <p className="text-muted my-3 ff-secondary">
                    Our scalable ERP solutions adapt and expand with your
                    business, supporting growth and new opportunities.
                  </p>
                  <div>
                    <Link to="#" className="fs-13 fw-medium">
                      Learn More{" "}
                      <i className="ri-arrow-right-s-line align-bottom"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={4}>
              <div className="d-flex p-3">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm icon-effect">
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i
                        className="ri-money-dollar-circle-line fs-36"
                        style={{ color: "#4b38b3" }}
                      ></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-18">Proven ROI: Investing in Success</h5>
                  <p className="text-muted my-3 ff-secondary">
                    Investing in our ERP solutions ensures a clear return on
                    investment by enhancing efficiency, reducing costs, and
                    driving business growth.
                  </p>
                  <div>
                    <Link to="#" className="fs-13 fw-medium">
                      Learn More{" "}
                      <i className="ri-arrow-right-s-line align-bottom"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={4}>
              <div className="d-flex p-3">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm icon-effect">
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i
                        className="ri-tools-fill fs-36"
                        style={{ color: "#4b38b3" }}
                      ></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-18">Easy to Customize</h5>
                  <p className="text-muted my-3 ff-secondary">
                    Tailor your ERP system to fit your specific business needs
                    with our flexible customization options.
                  </p>
                  <div>
                    <Link to="#" className="fs-13 fw-medium">
                      Learn More{" "}
                      <i className="ri-arrow-right-s-line align-bottom"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={4}>
              <div className="d-flex p-3">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm icon-effect">
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i
                        className="ri-customer-service-2-line fs-36"
                        style={{ color: "#4b38b3" }}
                      ></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-18">24/7 Support</h5>
                  <p className="text-muted my-3 ff-secondary">
                    We offer 24/7 support to keep your ERP system running
                    smoothly. Our dedicated team is always available to assist
                    with any issues or questions.
                  </p>
                  <div>
                    <Link to="#" className="fs-13 fw-medium">
                      Learn More{" "}
                      <i className="ri-arrow-right-s-line align-bottom"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={4}>
              <div className="d-flex p-3">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm icon-effect">
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i
                        className="ri-shield-keyhole-line fs-36"
                        style={{ color: "#4b38b3" }}
                      ></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-18">Robust Security Features</h5>
                  <p className="text-muted my-3 ff-secondary">
                    Our ERP solutions ensure data protection with encryption,
                    access controls, and regular audits.
                  </p>
                  <div>
                    <Link to="#" className="fs-13 fw-medium">
                      Learn More{" "}
                      <i className="ri-arrow-right-s-line align-bottom"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={4}>
              <div className="d-flex p-3">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm icon-effect">
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i
                        className="ri-user-smile-line fs-36"
                        style={{ color: "#4b38b3" }}
                      ></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-18">User-Friendly Interface</h5>
                  <p className="text-muted my-3 ff-secondary">
                    Our ERP systems offer intuitive designs for easy team
                    adoption, minimizing training and maximizing productivity.
                  </p>
                  <div>
                    <Link to="#" className="fs-13 fw-medium">
                      Learn More{" "}
                      <i className="ri-arrow-right-s-line align-bottom"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Services;
