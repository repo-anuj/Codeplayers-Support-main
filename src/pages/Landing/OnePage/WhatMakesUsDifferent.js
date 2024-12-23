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
      icon: <FaStar className="card-icon" />,
      title: "Innovation at Core",
      description:
        "We don't just follow trends - we set them. Our dedicated R&D team constantly pushes the boundaries of what's possible.",
    },
    {
      icon: <FaUsers className="card-icon" />,
      title: "Client-Centric Approach",
      description:
        "Every solution is tailored to your specific needs. We believe in partnerships, not just projects.",
    },
    {
      icon: <FaBolt className="card-icon" />,
      title: "24/7 Expert Support",
      description:
        "Round-the-clock dedicated support team ensuring your operations run smoothly without interruption.",
    },
    {
      icon: <FaChartLine className="card-icon" />,
      title: "Proven Track Record",
      description:
        "15+ years of excellence with 500+ successful projects across diverse industries.",
    },
    {
      icon: <FaRocket className="card-icon" />,
      title: "Future-Ready Solutions",
      description:
        "Our solutions are built with scalability in mind, growing alongside your business.",
    },
    {
      icon: <FaPiggyBank className="card-icon" />,
      title: "Cost-Effective Excellence",
      description:
        "Premium solutions that provide exceptional value without breaking your budget.",
    },
  ];

  return (
    <div className="differentiators" id="features">
      <motion.div
        className="header-content"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h1>
          STREAMLINED OPERATIONS WITH{" "}
          <samp> ENTERPRISE-GRADE ERP SOLUTIONS</samp>
        </h1>
        <div className="underline"></div>
        <br />
        <p>
          Unlock the full potential of your business with our comprehensive ERP
          solutions designed to streamline processes, reduce costs, and
          safeguard your data—all while providing you with the flexibility to
          scale as needed. Experience seamless integration and unparalleled
          support, empowering your organization to focus on what truly matters:
          growth and success.
        </p>
      </motion.div>

      <div className="cards-container">
        {cards.map((card, index) => (
          <motion.div
            className="card"
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="card-content">
              <div className="icon-wrapper">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Differentiators;
