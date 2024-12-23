import React from "react";
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Images
import amazon from "../../../assets/images/clients/client-1.png";
import walmart from "../../../assets/images/clients/client-2.png";
import lenovo from "../../../assets/images/clients/client-3.jpg";
import paypal from "../../../assets/images/clients/client-4.png";
import shopify from "../../../assets/images/clients/client-5.png";
import verizon from "../../../assets/images/clients/client-6.png";
import IntegrationPage from "./IntegrationPage";

const Client = () => {
  return (
    <React.Fragment>
      <div className="pt-5 mt-5">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mt-5">
                <h5 className="fs-20 fw-bold mb-4">
                  Our{" "}
                  <Link
                    to="/IntegrationPage"
                    className="text-decoration-none"
                    style={{
                      color: "#4b38b3",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#372a86")}
                    onMouseLeave={(e) => (e.target.style.color = "#4b38b3")}
                  >
                    Integration
                  </Link>{" "}
                  With Payment Systems
                </h5>
                <Swiper
                  slidesPerView={4}
                  spaceBetween={30}
                  pagination={false}
                  breakpoints={{
                    576: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    1024: {
                      slidesPerView: 4,
                    },
                  }}
                  loop={true}
                  autoplay={{ delay: 1000, disableOnInteraction: false }}
                  modules={[Pagination, Autoplay]}
                  className="mySwiper swiper trusted-client-slider mt-sm-5 mt-4 mb-sm-5 mb-4"
                >
                  {[amazon, walmart, lenovo, paypal, shopify, verizon].map(
                    (image, index) => (
                      <SwiperSlide key={index}>
                        <Link to="/IntegrationPage" className="client-images">
                          <img
                            src={image}
                            alt={`client-img-${index + 1}`}
                            className="mx-auto img-fluid d-block"
                            style={{
                              transition:
                                "transform 0.3s ease, opacity 0.3s ease",
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.transform = "scale(1.05)";
                              e.target.style.opacity = "0.8";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = "scale(1)";
                              e.target.style.opacity = "1";
                            }}
                          />
                        </Link>
                      </SwiperSlide>
                    )
                  )}
                </Swiper>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Client;
