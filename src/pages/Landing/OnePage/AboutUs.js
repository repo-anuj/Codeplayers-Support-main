import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { changeLayoutMode } from "../../../slices/thunks";
import { Col, Container, Nav, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AboutUs.scss";
import Navbar from "./NavbarPage";
import Footer from "./footer";
import AboutUs_1 from "./AboutUs/AboutUs_MIssion";
import AboutUs_2 from "./AboutUs/AboutUs_2";
import AboutUs_3 from "./AboutUs/AboutUs_3";
import AboutUs_4 from "./AboutUs/AboutUs_4";
import Team from "./team";

const AboutUs = () => {
  const dispatch = useDispatch();
  const selectLayoutState = (state) => state.Layout;
  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (layout) => ({
      layoutModeType: layout.layoutModeType,
    })
  );
  const { layoutModeType } = useSelector(selectLayoutProperties);

  useEffect(() => {
    if (layoutModeType) {
      window.dispatchEvent(new Event("resize"));
      dispatch(changeLayoutMode(layoutModeType));
    }
  }, [layoutModeType, dispatch]);
  /*
call dark/light mode
*/
  const onChangeLayoutMode = (value) => {
    if (changeLayoutMode) {
      dispatch(changeLayoutMode(value));
    }
  };
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this runs once when the component mounts
  return (
    <div
      style={{
        overflow: "hidden",
      }}
    >
      <Navbar
        onChangeLayoutMode={onChangeLayoutMode}
        layoutModeType={layoutModeType}
      />
      <section
        className="ezy__header17 light"
        id="ezy__header17"
        style={{
          backgroundImage:
            "url(https://cdn.easyfrontend.com/pictures/featured/feature6.jpg)",
        }}
      >
        <div className="ezy__header17-overlay">
          <Container>
            <Row className=" inner-wrapper">
              <Col xs={12} className="text-center">
                <div className="position-relative d-inline-block">
                  <div>
                    <p className="ezy__header17-sub-heading" data-aos="fade-up">
                      About
                    </p>
                  </div>
                  <div>
                    <h1
                      className="ezy__header17-heading py-2"
                      data-aos="fade-up"
                    >
                      Our ERP Software Company
                      <span className="ezy__header17-bottom-line" />
                      <span className="ezy__header17-bottom-line" />
                    </h1>
                  </div>
                </div>

                <div>
                  <Nav
                    className="ezy__header17-location d-inline-flex mt-2"
                    data-aos="fade-up"
                  >
                    <li className="me-4">
                      <FontAwesomeIcon className="me-1" /> Learn more about our
                      company and our dedicated team.
                    </li>
                  </Nav>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      <AboutUs_1 />
      <AboutUs_2 />
      <AboutUs_3 />
      <AboutUs_4 />
      <Team />
      <Footer />
    </div>
  );
};
export default AboutUs;
