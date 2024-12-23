import React from "react";

// Import Images
import img1 from "../../../assets/images/landing/features/img-1.png";
import img2 from "../../../assets/images/landing/features/img-2.png";
import img3 from "../../../assets/images/landing/features/img-3.png";
import logodark from "../../../assets/images/logo-light.png";
import Services_all from "./Services_all";
import { Link } from "react-router-dom";

const Features = () => {
  const infinityXServices = [
    "SMEs",
    "Management Information System (MIS)",
    "Builders and Contractors",
    "Restaurant & Bar Management",
    "Theater Food Ordering",
    "Retail and Wholesale Traders",
    "FMCG",
  ];

  const infinityERPServices = [
    "Steel and Allied Industries",
    "Logistics & Movement",
    "Food Court Management",
    "Property Management System",
    "School Management System",
  ];

  const infinityFleetServices = [
    "Route Optimization",
    "Vehicle Maintenance Management",
    "Driver Management",
  ];

  return (
    <React.Fragment>
      <section className="section bg-light py-5" id="features">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6 col-sm-7 mx-auto">
              <div>
                <img
                  src={logodark}
                  alt=""
                  className="img-fluid mx-auto w-200%"
                  style={{ width: "300px" }}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-muted">
                <div className="avatar-sm icon-effect mb-4">
                  <div className="avatar-title bg-transparent rounded-circle text-success h1">
                    <i
                      className="ri-collage-line fs-36"
                      style={{ color: "#4b38b3" }}
                    ></i>
                  </div>
                </div>
                <h3 className="mb-3 fs-20">Comprehensive Industry Solutions</h3>
                <p className="mb-4 ff-secondary fs-16">
                  Infinity provides tailored solutions for various industries,
                  ensuring efficient management and streamlined operations
                  across different sectors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-primary position-relative">
        <div className="bg-overlay bg-overlay-pattern opacity-50"></div>
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-sm">
              <div>
                <h4 className="text-white mb-0 fw-semibold">
                  Transform your business with Infinity solutions
                </h4>
              </div>
            </div>
            <div className="col-sm-auto">
              <div>
                <Link to="/Services_all" className="btn bg-gradient btn-danger">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6 order-2 order-lg-1">
              <div className="text-muted">
                <h5 className="fs-12 text-uppercase text-success">
                  Infinity X
                </h5>
                <h4 className="mb-3">
                  Tailored Solutions for Diverse Industries
                </h4>
                <p className="mb-4 ff-secondary">
                  InfinityX offers comprehensive solutions for various business
                  types, streamlining operations and enhancing efficiency.
                </p>

                <div className="row pt-3">
                  <div className="col-sm-5">
                    <div className="vstack gap-2">
                      {infinityXServices
                        .slice(0, Math.ceil(infinityXServices.length / 2))
                        .map((service, index) => (
                          <div
                            className="d-flex align-items-center"
                            key={index}
                          >
                            <div className="flex-shrink-0 me-2">
                              <div className="avatar-xs icon-effect">
                                <div className="avatar-title bg-transparent text-success rounded-circle h2">
                                  <i
                                    className="ri-check-fill"
                                    style={{ color: "#4b38b3" }}
                                  ></i>
                                </div>
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h5 className="fs-14 mb-0">{service}</h5>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="col-sm-5">
                    <div className="vstack gap-2">
                      {infinityXServices
                        .slice(Math.ceil(infinityXServices.length / 2))
                        .map((service, index) => (
                          <div
                            className="d-flex align-items-center"
                            key={index}
                          >
                            <div className="flex-shrink-0 me-2">
                              <div className="avatar-xs icon-effect">
                                <div className="avatar-title bg-transparent text-success rounded-circle h2">
                                  <i
                                    className="ri-check-fill"
                                    style={{ color: "#4b38b3" }}
                                  ></i>
                                </div>
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h5 className="fs-14 mb-0">{service}</h5>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-7 col-10 ms-auto order-1 order-lg-2">
              <div>
                <img
                  src={img1}
                  alt=""
                  className="img-fluid"
                  style={{ width: "300px" }}
                />
              </div>
            </div>
          </div>

          <div className="row align-items-center mt-5 pt-lg-5 gy-4">
            <div className="col-lg-6 col-sm-7 col-10 mx-auto">
              <div>
                <img
                  src={img2}
                  alt=""
                  className="img-fluid"
                  style={{ width: "300px" }}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-muted ps-lg-5">
                <h5 className="fs-12 text-uppercase text-success">
                  Infinity ERP
                </h5>
                <h4 className="mb-3">
                  Comprehensive Enterprise Resource Planning
                </h4>
                <p className="mb-4">
                  Infinity ERP provides robust solutions for various industries,
                  ensuring seamless integration and efficient management of
                  resources.
                </p>

                <div className="vstack gap-2">
                  {infinityERPServices.map((service, index) => (
                    <div className="d-flex align-items-center" key={index}>
                      <div className="flex-shrink-0 me-2">
                        <div className="avatar-xs icon-effect">
                          <div className="avatar-title bg-transparent text-success rounded-circle h2">
                            <i
                              className="ri-check-fill"
                              style={{ color: "#4b38b3" }}
                            ></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <p className="mb-0">{service}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="row align-items-center mt-5 pt-lg-5 gy-4">
            <div className="col-lg-6 order-2 order-lg-1">
              <div className="text-muted">
                <h5 className="fs-12 text-uppercase text-success">
                  Infinity Fleet
                </h5>
                <h4 className="mb-3">Efficient Fleet Management Solutions</h4>
                <p className="mb-4 ff-secondary">
                  Infinity Fleet offers comprehensive tools for optimizing your
                  vehicle fleet operations and management.
                </p>

                <div className="vstack gap-2">
                  {infinityFleetServices.map((service, index) => (
                    <div className="d-flex align-items-center" key={index}>
                      <div className="flex-shrink-0 me-2">
                        <div className="avatar-xs icon-effect">
                          <div className="avatar-title bg-transparent text-success rounded-circle h2">
                            <i
                              className="ri-check-fill"
                              style={{ color: "#4b38b3" }}
                            ></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="fs-14 mb-0">{service}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-7 col-10 ms-auto order-1 order-lg-2">
              <div>
                <img
                  src={img3}
                  alt=""
                  className="img-fluid"
                  style={{ width: "300px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Features;
