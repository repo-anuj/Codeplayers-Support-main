import React from "react";
import { motion } from "framer-motion";
import {
  FaCogs,
  FaHeadset,
  FaShieldAlt,
  FaUserFriends,
  FaChartBar,
  FaPlug,
  FaCloud,
  FaExpandArrowsAlt,
  FaPiggyBank,
} from "react-icons/fa";
import "./NewFeature.scss";

const IntegrationCard = () => (
  <motion.div
    className="feature-card integration-card"
    whileInView={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.3 }}
    viewport={{ once: true }}
  ></motion.div>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    className="feature-card"
    whileInView={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.3 }}
    viewport={{ once: true }}
  >
    <Icon className="feature-icon" />
    <h4 className="feature-title">{title}</h4>
    <p>{description}</p>
  </motion.div>
);

const Features = () => {
  const features = [
    {
      icon: FaCogs,
      title: "Easy to Customize",
      description:
        "Tailor your ERP system to fit your specific business needs with our flexible customization options.",
    },
    {
      icon: FaHeadset,
      title: "24/7 Support",
      description:
        "We offer 24/7 support to keep your ERP system running smoothly. Our dedicated team is always available to assist with any issues or questions.",
    },
    {
      icon: FaShieldAlt,
      title: "Robust Security Features",
      description:
        "Our ERP solutions ensure data protection with encryption, access controls, and regular audits.",
    },
    {
      icon: FaUserFriends,
      title: "User-Friendly Interface",
      description:
        "Our ERP systems offer intuitive designs for easy team adoption, minimizing training and maximizing productivity.",
    },
    {
      icon: FaChartBar,
      title: "Comprehensive Analytics",
      description:
        "Gain deep insights into your business performance with our advanced analytics tools.",
    },
    {
      icon: FaPlug,
      title: "Seamless Integration",
      description:
        "Integrate easily with existing systems and third-party applications for a smooth experience.",
    },
    {
      icon: FaCloud,
      title: "Real-Time Collaboration",
      description:
        "Enhance team collaboration with real-time updates, shared dashboards, and seamless communication.",
    },
    {
      icon: FaExpandArrowsAlt,
      title: "Scalability",
      description:
        "Our ERP systems grow with your business, adapting to increasing demands.",
    },
    {
      icon: FaPiggyBank,
      title: "Cost Efficiency",
      description:
        "Minimize your operational costs by maximizing resource management and automating processes.",
    },
  ];

  return (
    <div className="body">
      <div className="features-container">
        <motion.div
          className="features-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h1>
            Features That <samp>Empower Your Business</samp>
          </h1>
          <p>Discover how our ERP solution can transform your operations</p>
        </motion.div>

        <motion.div
          className="features-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <IntegrationCard />
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </motion.div>
        <motion.button
          className="get-started-btn"
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          GET STARTED
        </motion.button>
      </div>
    </div>
  );
};

export default Features;
