// Home.jsx
import React from "react";
import { motion } from "framer-motion";
import Illustration from "./output-onlinegiftools3.gif";
import "../../../assets/scss/pages/Home.scss";

const Home = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: custom * 0.2 },
    }),
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.6 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="home" id="hero">
      {/* Geometric Pattern Background */}
      <div className="geometric-background">
        <div className="pattern-grid">
          {[...Array(100)].map((_, index) => (
            <div key={index} className="pattern-cell" />
          ))}
        </div>
      </div>

      <div className="content-wrapper">
        {/* Text Content */}
        <div className="text-content">
          <motion.h1
            className="title"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Innovate Your Business
            <span>With ERP</span>
          </motion.h1>

          <motion.p
            className="description"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Infinity provides tailored solutions for various industries,
            ensuring efficient management and streamlined operations across
            different sectors.
          </motion.p>

          <motion.button
            className="cta-button"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
          >
            <span>Discover Us</span>
            <div className="button-background" />
          </motion.button>
        </div>

        {/* Image */}
        <motion.div
          className="image-wrapper"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <img
            src={Illustration}
            alt="Company illustration"
            className="main-illustration"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
