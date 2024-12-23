import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lid from "./Lid";
import Keypad from "./Keypad";
import Trackpad from "./Trackpad";
import SpeakerGrid from "./SpeakerGrid";
import "./MacbookScroll.scss";

const MacbookScroll = ({ src, showGradient, title }) => {
  const ref = useRef(null);
  const { scrollY, scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [1.2, 1.5, 1.5, 1.2]
  );
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.6, 1.5, 1.5, 0.6]
  );
  const translate = useTransform(scrollY, [0, 1500], [0, 1500]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
  const textTransform = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 100, 100, 0]
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [1, 1, 0, 0]
  );

  return (
    <div ref={ref} className="macbook-scroll">
      <motion.h2
        style={{
          translateY: textTransform,
          opacity: textOpacity,
        }}
        className="title"
      >
        {title}
      </motion.h2>

      <Lid
        src={src}
        scaleX={scaleX}
        scaleY={scaleY}
        rotate={rotate}
        translate={translate}
      />

      <div className="base">
        <div className="top-bar">
          <div className="sound-bar" />
        </div>
        <div className="keyboard-area">
          <div className="speaker-left">
            <SpeakerGrid />
          </div>
          <div className="keyboard">
            <Keypad />
          </div>
          <div className="speaker-right">
            <SpeakerGrid />
          </div>
        </div>
        <Trackpad />
        <div className="bottom-grip" />
        {showGradient && <div className="gradient-overlay" />}
      </div>
    </div>
  );
};

export default MacbookScroll;
