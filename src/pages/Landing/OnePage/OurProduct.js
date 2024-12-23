import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./OurProduct.scss";
import infinityERP from "../../../assets/images/landing/features/mockuper5.png";
import infinityFleet from "../../../assets/images/landing/features/mockuper3.png";
import infinityX from "../../../assets/images/landing/features/mockuper2.png";

import CEO from "../../../assets/images/landing/features/CEO.png";
import FinanceApp from "../../../assets/images/landing/features/Finance App 1.png";
import Multitasking from "../../../assets/images/landing/features/Multitaking.png";

const backgroundIllustrations = [CEO, FinanceApp, Multitasking];

const OurProduct = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const products = [
    {
      title: "Infinity X",
      subtitle: "Tailored Solutions for Diverse Industries",
      description:
        "InfinityX offers comprehensive solutions for various business types, streamlining operations and enhancing efficiency.",
      features: [
        "SMEs",
        "Management Information System (MIS)",
        "Builders and Contractors",
        "Restaurant & Bar Management",
        "Theater Food Ordering",
        "Retail and Wholesale Traders",
        "FMCG",
      ],
      img: infinityX,
    },
    {
      title: "Infinity Fleet",
      subtitle: "Efficient Fleet Management Solutions",
      description:
        "Infinity Fleet offers comprehensive tools for optimizing your vehicle fleet operations and management.",
      features: [
        "Route Optimization",
        "Vehicle Maintenance Management",
        "Driver Management",
        "Real-time Tracking",
      ],
      img: infinityFleet,
    },
    {
      title: "Infinity ERP",
      subtitle: "Comprehensive Enterprise Resource Planning",
      description:
        "Infinity ERP provides robust solutions for various industries, ensuring seamless integration and efficient management of resources.",
      features: [
        "Steel and Allied Industries",
        "Logistics & Movement",
        "Food Court Management",
        "Property Management System",
        "School Management System",
      ],
      img: infinityERP,
    },
  ];

  return (
    <div className="parallax-product" id="services" ref={containerRef}>
      <div className="parallax-product-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="parallax-product-header"
        >
          <h1>
            <span className="highlight">What Our</span> Product Does
          </h1>
          <p>
            It should be very clear who your product is for and what problem it
            solves for them.
          </p>
        </motion.div>

        {products.map((product, index) => (
          <ProductSection
            key={product.title}
            product={product}
            index={index}
            scrollYProgress={scrollYProgress}
            backgroundImage={backgroundIllustrations[index]}
          />
        ))}
      </div>
    </div>
  );
};

const ProductSection = ({
  product,
  index,
  scrollYProgress,
  backgroundImage,
}) => {
  const sectionRef = useRef(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(sectionProgress, [0, 1], [100, -100]);
  const opacity = useTransform(sectionProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    sectionProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  // Background parallax effect
  const backgroundY = useTransform(sectionProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={sectionRef}
      className="parallax-product-section"
      style={{ opacity }}
    >
      <motion.div
        className="background-illustration"
        style={{
          y: backgroundY,
          backgroundImage: `url(${backgroundImage})`,
          opacity: useTransform(
            sectionProgress,
            [0, 0.2, 0.8, 1],
            [0, 0.15, 0.15, 0]
          ),
        }}
      />
      <div
        className={`parallax-product-section-content ${
          index % 2 !== 0 ? "reverse" : ""
        }`}
      >
        <motion.div className="text-content" style={{ y, scale }}>
          <h2>{product.title}</h2>
          <h3>{product.subtitle}</h3>
          <p>{product.description}</p>
          <ul className="features-list">
            {product.features.map((feature, idx) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {feature}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="visual-content"
          style={{ y: useTransform(y, (value) => value * -1), scale }}
        >
          <div className="product-card">
            <img src={product.img} alt={`${product.title} preview`} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OurProduct;
