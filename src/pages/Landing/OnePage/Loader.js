import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Loader.scss";
import logolight from "../../../assets/images/logo-light.png";

const LandingLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="landing-loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="loader-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="logo-wrapper">
              <img
                src={logolight}
                alt="CodePlayers Logo"
                className="loader-logo"
                height="60"
              />
            </div>
            <motion.div
              className="progress-bar"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LandingLoader;
