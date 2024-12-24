import React from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaUsers,
  FaBolt,
  FaChartLine,
  FaRocket,
  FaPiggyBank,
} from "react-icons/fa";
import "../../../assets/scss/pages/WhatMakesUsDifferent.scss";

const Differentiators = () => {
  const cards = [
    {
      icon: <FaStar />,
      title: "Innovation at Core",
      description:
        "We don't just follow trends - we set them. Our dedicated R&D team constantly pushes the boundaries of what's possible.",
    },
    {
      icon: <FaUsers />,
      title: "Client-Centric Approach",
      description:
        "Every solution is tailored to your specific needs. We believe in partnerships, not just projects.",
    },
    {
      icon: <FaBolt />,
      title: "24/7 Expert Support",
      description:
        "Round-the-clock dedicated support team ensuring your operations run smoothly without interruption.",
    },
    {
      icon: <FaChartLine />,
      title: "Proven Track Record",
      description:
        "15+ years of excellence with 500+ successful projects across diverse industries.",
    },
    {
      icon: <FaRocket />,
      title: "Future-Ready Solutions",
      description:
        "Our solutions are built with scalability in mind, growing alongside your business.",
    },
    {
      icon: <FaPiggyBank />,
      title: "Cost-Effective Excellence",
      description:
        "Premium solutions that provide exceptional value without breaking your budget.",
    },
  ];

  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="differentiators" id="features">
      <motion.div
        className="header-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={headerVariants}
      >
        <h1>
          STREAMLINED OPERATIONS WITH{" "}
          <samp>ENTERPRISE-GRADE ERP SOLUTIONS</samp>
        </h1>
        <div className="underline" />
        <p>
          Unlock the full potential of your business with our comprehensive ERP
          solutions designed to streamline processes, reduce costs, and
          safeguard your data—all while providing you with the flexibility to
          scale as needed. Experience seamless integration and unparalleled
          support, empowering your organization to focus on what truly matters:
          growth and success.
        </p>
      </motion.div>

      <motion.div
        className="cards-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="card"
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.3 },
            }}
          >
            <div className="card-content">
              <motion.div
                className="icon-wrapper"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <span className="card-icon">{card.icon}</span>
              </motion.div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Differentiators;
