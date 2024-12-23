import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MacbookScroll from "./MacbookScroll";
import { motion } from "framer-motion";
import "./HeroSection.scss";
import Macbook from "./image.jpg";

const HeroSection = ({ src }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initParticles();
  }, []);

  const initParticles = () => {
    const canvas = document.getElementById("particle-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const particles = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const createParticles = () => {
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    };

    createParticles();
    animate();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  };

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  return (
    <div className={`hero-section ${mounted ? "mounted" : ""}`} id="hero">
      <canvas id="particle-canvas" className="particle-canvas" />

      <div className="content-wrapper">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>
            Elevate Your <span className="highlight-blue"> Business</span>
            <br /> With <span className="highlight-purple">
              Modern ERP
            </span>{" "}
            Solutions
          </h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            From Ideas to Integration: Making Your Vision a Reality
          </motion.h2>

          <motion.div
            className="button-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/AboutUs">
              <button className="btn primary">Discover Us</button>
            </Link>
            <Link to="/ERPLogin">
              <button className="btn secondary">Join Us</button>
            </Link>
          </motion.div>
        </motion.div>

        <div className="macbook-container">
          <MacbookScroll src={Macbook} showGradient={false} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
