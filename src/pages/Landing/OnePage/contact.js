import React, { useState } from "react";
import { Col, Container, Form, Row } from "reactstrap";
import emailjs from "@emailjs/browser";
import "./contact.scss";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace these with your actual EmailJS credentials
      const result = await emailjs.send(
        "service_fedq014",
        "template_k6l4miy",
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.comments,
        },
        "r_SucAvoFwjMMo3Z8"
      );

      console.log("Email sent successfully:", result.text);
      alert("Message sent successfully!");

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        comments: "",
      });
    } catch (error) {
      console.error("Email sending failed:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <React.Fragment>
      <section className="section contact-section" id="contact">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="text-center mb-5">
                <h3 className="mb-3 fw-semibold heading-animate">
                  Get In Touch
                </h3>
                <p className="text-muted mb-4 ff-secondary subtext-animate">
                  We thrive when coming up with innovative ideas but also
                  understand that a smart concept should be supported with
                  measurable results.
                </p>
              </div>
            </Col>
          </Row>

          <Row className="gy-4">
            <Col lg={4}>
              <div className="address-card">
                <h5 className="fs-13 text-muted text-uppercase">
                  Raipur Office:
                </h5>
                <div className="address-text">
                  C 24-25, Infinity Tower, Sector-5, Devendra Nagar, Raipur,
                  <br />
                  CG. 492001.
                </div>
              </div>
              <br />
              <div className="address-card">
                <h5 className="fs-13 text-muted text-uppercase">
                  Raighar Office:
                </h5>
                <div className="address-text">
                  C 24-25, Infinity Tower, Sector-5, Devendra Nagar, Raipur,
                  <br />
                  CG. 492001.
                </div>
              </div>
            </Col>
            <Col lg={8}>
              <div className="contact-form">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col lg={6}>
                      <div className="mb-4 input-container">
                        <label htmlFor="name" className="form-label fs-13">
                          Name
                        </label>
                        <input
                          name="name"
                          id="name"
                          type="text"
                          className="form-control input-field"
                          placeholder="Your name*"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-4 input-container">
                        <label htmlFor="email" className="form-label fs-13">
                          Email
                        </label>
                        <input
                          name="email"
                          id="email"
                          type="email"
                          className="form-control input-field"
                          placeholder="Your email*"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <div className="mb-4 input-container">
                        <label htmlFor="subject" className="form-label fs-13">
                          Subject
                        </label>
                        <input
                          type="text"
                          className="form-control input-field"
                          id="subject"
                          name="subject"
                          placeholder="Your Subject.."
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <div className="mb-3 input-container">
                        <label htmlFor="comments" className="form-label fs-13">
                          Message
                        </label>
                        <textarea
                          name="comments"
                          id="comments"
                          rows="3"
                          className="form-control input-field"
                          placeholder="Your message..."
                          value={formData.comments}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                    </Col>
                  </Row>
                  {/* [Other input fields remain similar, added value and onChange] */}
                  <Row>
                    <Col lg={12} className="text-end">
                      <input
                        type="submit"
                        id="submit"
                        name="send"
                        className="submitBnt btn btn-primary"
                        value="Send Message"
                      />
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Contact;
