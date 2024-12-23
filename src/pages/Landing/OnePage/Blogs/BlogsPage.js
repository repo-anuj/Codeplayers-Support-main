import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { changeLayoutMode } from "../../../../slices/thunks";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import Footer from "../footer";
import Navbar from "../NavbarPage";
import "./BlogsPage.scss";
import blog1 from "../../../../assets/images/landing/blog/blog_image1.jpg";
import blog2 from "../../../../assets/images/landing/blog/blog_image2.jpg";
import blog3 from "../../../../assets/images/landing/blog/blog_image3.jpg";
import blog4 from "../../../../assets/images/landing/blog/blog_image4.jpg";
import blog5 from "../../../../assets/images/landing/blog/blog_image5.jpg";

const blogs = [
  {
    title: "The Future of ERP: Trends to Watch",
    description:
      "Explore the latest trends in ERP, including AI integration, cloud-based solutions, user experience improvements, and industry-specific systems.",
    author: "Ben Stokes",
    image: blog1,
    date: "26",
    month: "Oct",
    year: "2016",
    link: "/blog_1",
  },
  {
    title: "How ERP Can Improve Your Business Efficiency",
    description:
      "Learn why ERP systems are crucial for business efficiency, improved decision-making, and overall growth.",
    author: "Moein Ali",
    image: blog2,
    date: "11",
    month: "May",
    year: "2020",
    link: "/blog_2",
  },
  {
    title: "Choosing the Right ERP System for Your Business",
    description:
      "Discover the best practices for a successful ERP implementation, including goal setting, project team assembly, and effective communication.",
    author: "Maxy Paulo",
    image: blog3,
    date: "19",
    month: "Mar",
    year: "2021",
    link: "/blog_3",
  },
  {
    title: "The Benefits of Cloud-Based ERP Systems",
    description:
      "Understand how to maximize your return on investment with ERP systems through strategic planning and continuous improvement.",
    author: "Maxy Paulo",
    image: blog4,
    date: "19",
    month: "Mar",
    year: "2021",
    link: "/blog_4",
  },
  {
    title: "ERP Implementation: Best Practices",
    description:
      "Explore how ERP systems play a vital role in digital transformation and driving business innovation.",
    author: "Maxy Paulo",
    image: blog5,
    date: "19",
    month: "Mar",
    year: "2021",
    link: "/blog_5",
  },
];

const BlogItem = ({ blog }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
      className="h-100"
    >
      <article className="ezy__blog7-post h-100 d-flex flex-column">
        <div className="position-relative overflow-hidden">
          <motion.img
            src={blog.image}
            alt={blog.title}
            className="img-fluid w-100 ezy-blog7-banner"
            initial={{ opacity: 1 }}
            whileHover={{
              scale: 1.1,
              opacity: 0.8,
              transition: { duration: 0.3 },
            }}
          />
          <div className="px-3 py-2 ezy__blog7-calendar shadow-sm">
            <div className="text-center">
              <span className="d-block fw-bold">{blog.date}</span>
              <span className="d-block text-muted small">{blog.month}</span>
              <span className="d-block text-muted small">{blog.year}</span>
            </div>
          </div>
        </div>
        <div className="p-3 p-md-4 flex-grow-1 d-flex flex-column">
          <h4 className="mt-3 ezy__blog7-title fs-4 mb-3">{blog.title}</h4>
          <p className="ezy__blog7-description mt-auto mb-4 flex-grow-1">
            {blog.description}
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to={blog.link}>
              <Button
                variant="outline-primary"
                className="ezy__blog7-btn-read-more w-100"
              >
                Read more
              </Button>
            </Link>
          </motion.div>
        </div>
      </article>
    </motion.div>
  );
};

BlogItem.propTypes = {
  blog: PropTypes.object.isRequired,
};

const BlogsPage = () => {
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
      <motion.section
        className="ezy__blog7 light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img
          src="https://cdn.easyfrontend.com/pictures/blog/wide-banner.png"
          alt="Blog Banner"
          className="img-fluid w-100"
          initial={{ scale: 1 }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 },
          }}
        />

        <div className="ezy__blog7-wrapper">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Row>
                <Col lg={8}>
                  <h2 className="ezy__blog7-heading mb-3 mt-0">ERP Blogs</h2>
                  <p className="ezy__blog7-sub-heading mb-4">
                    Strategies for Elevating Your Business Performance
                    Strategies for Elevating Your Business Performance
                    Strategies for Elevating Your Business Performance
                  </p>
                </Col>
              </Row>
            </motion.div>
            <Row className="mt-5 g-4">
              {blogs.map((blog, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                  }}
                  className="col-12 col-md-6 col-lg-4"
                >
                  <BlogItem blog={blog} />
                </motion.div>
              ))}
            </Row>
          </Container>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
};

export default BlogsPage;
