import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./WhyWeAreBest.scss";

const tabs = ["Infinity X", "Infinity Fleet", "Infinity ERP", "Infinity Shop"];

const InfinityServicesCard = () => {
  const [activeTab, setActiveTab] = useState("Infinity X");

  const tabContent = {
    "Infinity X": {
      title: "Tailored Solutions for Diverse Industries",
      subtitle: "Infinity X",
      description:
        "InfinityX offers comprehensive solutions for various business types, streamlining operations and enhancing efficiency.",
      services: [
        "SMEs",
        "Management Information System (MIS)",
        "Builders and Contractors",
        "Restaurant & Bar Management",
        "Theater Food Ordering",
        "Retail and Wholesale Traders",
        "FMCG",
      ],
    },
    "Infinity Fleet": {
      title: "Efficient Fleet Management Solutions",
      subtitle: "Infinity Fleet",
      description:
        "Infinity Fleet offers comprehensive tools for optimizing your vehicle fleet operations and management.",
      services: [
        "Route Optimization",
        "Vehicle Maintenance Management",
        "Driver Management",
      ],
    },
    "Infinity ERP": {
      title: "Comprehensive Enterprise Resource Planning",
      subtitle: "Infinity ERP",
      description:
        "Infinity ERP provides robust solutions for various industries, ensuring seamless integration and efficient management of resources.",
      services: [
        "Steel and Allied Industries",
        "Logistics & Movement",
        "Food Court Management",
        "Property Management System",
        "School Management System",
      ],
    },
    "Infinity Shop": {
      title: "Advanced E-commerce Platform",
      subtitle: "Infinity Shop",
      description:
        "Infinity Shop offers end-to-end e-commerce solutions for setting up, managing, and scaling online businesses.",
      services: [
        "Product Listing",
        "Inventory Management",
        "Customer Management",
        "Sales Analytics",
        "Order Processing",
      ],
    },
  };

  return (
    <div className="infinity-services-card">
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
          >
            {tab}
          </button>
        ))}
        <motion.div
          className="highlight"
          layoutId="highlight"
          animate={{ x: tabs.indexOf(activeTab) * 120 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>

      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
          className="content"
        >
          <h5 className="subtitle">{tabContent[activeTab].subtitle}</h5>
          <h4 className="title">{tabContent[activeTab].title}</h4>
          <p className="description">{tabContent[activeTab].description}</p>

          <ul className="services-list">
            {tabContent[activeTab].services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>

          <button className="cta-button">Get Started - No CC Required</button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default InfinityServicesCard;
