import React from "react";
import { motion } from "framer-motion";
import { FaApple } from "react-icons/fa";
import "./Lid.scss";

const Lid = ({ scaleX, scaleY, rotate, translate, src }) => {
  return (
    <div className="lid-container">
      <div className="lid-top">
        <div className="lid-inner">
          <span className="apple-logo">
            <FaApple />
          </span>
        </div>
      </div>
      <motion.div
        style={{
          scaleX: scaleX,
          scaleY: scaleY,
          rotateX: rotate,
          translateY: translate,
          transformStyle: "preserve-3d",
          transformOrigin: "top",
        }}
        className="lid-screen"
      >
        <div className="screen-inner" />
        <img src={src} alt="screen content" className="screen-content" />
      </motion.div>
    </div>
  );
};

export default Lid;
