import React from "react";
import { Col, Container, Row } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import img from "../../../assets/images/landing/testimonials-3.jpg";
import "../../../assets/scss/pages/Reviews.scss"; // Import the Sass file

const Reviews = () => {
  const testimonials = [
    {
      name: "Shri Nimish Gadodia",
      position: "Managing Director",
      company: "Navdurga Group & Scan Group of Companies",
      testimonial:
        "Implementing CodePlayers Pvt Ltd's ERP system has been a game-changer for us. The extensive functionalities, combined with excellent customization options and reliable support, have greatly enhanced our efficiency. We strongly recommend their ERP system.",
    },
    {
      name: "Shri Sparsh Goel",
      position: "Director",
      company: "Hector Pipes",
      testimonial:
        "We are thrilled with the Infinity ERP system. It stands out with comprehensive features, an intuitive interface, and valuable customization options. Their robust support and proven success ensure smooth operations and enhanced productivity. We highly recommend their ERP solution for any organization looking to improve efficiency.",
    },
    {
      name: "Shri Aman Agrawal",
      position: "Director",
      company: "Vedanta Washery & Logistics Private Limited",
      testimonial:
        "We chose CodePlayers Pvt Ltd's ERP for its robust features and customization capabilities. The seamless integration into our existing systems and the immediate improvement in productivity have been impressive. Their support is top-notch, making this ERP a fantastic choice.",
    },
    {
      name: "Shri Bhupesh Gupta",
      position: "Managing Director",
      company: "Cauvery Iron & Steel (India) Limited",
      testimonial:
        "CodePlayers Pvt Ltd's ERP system has revolutionized our operations. The user-friendly design and powerful features have streamlined our processes, while their exceptional support team ensures we always have the help we need. We highly recommend their ERP solution.",
    },
  ];

  return (
    <section className="reviews-section" id="reviews">
      <div className="bg-overlay bg-overlay-pattern"></div>
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="text-center">
              <div className="quotes-icon">
                <i className="ri-double-quotes-l text-success display-3"></i>
              </div>
              <h4 className="text-white mb-5">
                Hear directly from our customers about their experiences with
                our products and services
              </h4>

              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                pagination={{ clickable: true }}
                navigation={true}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                className="mySwiper swiper client-review-swiper rounded"
              >
                {testimonials.map((testimonial, index) => (
                  <SwiperSlide key={index}>
                    <div className="testimonial-card">
                      <div className="testimonial-content">
                        <div className="d-flex justify-content-center align-items-center mb-4">
                          <img
                            src={img}
                            alt={testimonial.name}
                            className="rounded-circle me-3 testimonial-image"
                          />
                          <div className="text-start">
                            <h5 className="text-white">{testimonial.name}</h5>
                            <p className="mb-0">{testimonial.position}</p>
                            <p>{testimonial.company}</p>
                          </div>
                        </div>
                        <p className="fs-18 ff-secondary mb-4">
                          "{testimonial.testimonial}"
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Reviews;
