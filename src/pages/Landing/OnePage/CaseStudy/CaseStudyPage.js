import React from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { changeLayoutMode } from "../../../../slices/thunks";
import { useEffect } from "react";
import Footer from "../footer";
import Navbar from "../NavbarPage";

import case_study1 from "../../../../assets/images/landing/Case_Studies/dps.jpeg";
import case_study2 from "../../../../assets/images/landing/Case_Studies/jt.png";
import case_study3 from "../../../../assets/images/landing/Case_Studies/nav.png";
import case_study4 from "../../../../assets/images/landing/Case_Studies/jewellary.jpg";
import case_study5 from "../../../../assets/images/landing/Case_Studies/HectorPipes.jpg";

import "./CaseStudyPage.scss";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 20px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)",
    transition: { duration: 0.3 },
  },
};

const caseStudies = [
  {
    image: case_study1,
    title: "DPS Raigarh",
    description: "Streamlining University Administration with Infinity ERP",
    link: "/case_1",
  },
  {
    image: case_study2,
    title: "Jagadambha Trailors",
    description:
      "Enhancing Operational Efficiency at Jagadamba Trailers with Infinity ERP",
    link: "/case_2",
  },
  {
    image: case_study3,
    title: "Navdurga Group",
    description:
      "Transforming Steel Manufacturing Operations with Infinity ERP",
    link: "/case_3",
  },
  {
    image: case_study4,
    title: "Rambhagat Laxminarayan Jewelry",
    description: "Elevating Jewelry Manufacturing Efficiency",
    link: "/case_4",
  },
  {
    image: case_study5,
    title: "Hector Pipes",
    description: "Optimizing Steel Manufacturing Operations",
    link: "/case_5",
  },
];

const CaseStudiesPage = () => {
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

  const onChangeLayoutMode = (value) => {
    if (changeLayoutMode) {
      dispatch(changeLayoutMode(value));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar
        onChangeLayoutMode={onChangeLayoutMode}
        layoutModeType={layoutModeType}
      />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="py-5 bg-light"
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-5"
          >
            <h1 className="display-4 mb-3">Our Case Studies</h1>
            <p className="lead text-muted">
              Transforming Businesses Through Innovative Solutions
            </p>
          </motion.div>

          <Row>
            {caseStudies.map((study, index) => (
              <Col key={index} md={4} className="mb-4">
                <motion.div variants={cardVariants} whileHover="hover">
                  <Card className={`border-0 shadow-sm h-100 card`}>
                    <div
                      className="overflow-hidden"
                      style={{ height: "250px" }}
                    >
                      <Card.Img
                        variant="top"
                        src={study.image}
                        className="img-fluid object-cover"
                        style={{
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title as="h5" className="mb-3">
                        {study.title}
                      </Card.Title>
                      <Card.Text className="text-muted mb-4">
                        {study.description}
                      </Card.Text>
                      <Button href={study.link} className="w-100">
                        Explore Case Study
                      </Button>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </motion.div>
      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
