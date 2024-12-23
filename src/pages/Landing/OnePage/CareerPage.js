// App.jsx
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { changeLayoutMode } from "../../../slices/thunks";
import col1 from "../../../assets/images/colleges/1.jpg";
import col2 from "../../../assets/images/colleges/2.jpg";
import col3 from "../../../assets/images/colleges/3.jpg";
import col4 from "../../../assets/images/colleges/4.png";
import cert1 from "../../../assets/images/Certificates/CP Completion Certificate.jpg";
import cert2 from "../../../assets/images/Certificates/CP Letter of Appreciation.jpg";
import Navbar from "./NavbarPage";
import Footer from "./footer";
import "../../../assets/scss/pages/Career.scss";

const Modal = ({ isOpen, onClose, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const InstitutionCard = ({ name, description, imageUrl }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="institution-card"
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div className="image-container">
        <img src={imageUrl} alt={name} />
        <motion.div
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          {/* <span>View Details</span> */}
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3>{name}</h3>
        <p>{description}</p>
      </motion.div>
    </motion.div>
  );
};

const CertificateCard = ({ imageUrl, title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        className="certificate-card"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="certificate-image">
          <img src={imageUrl} alt={title} />
          <div className="view-overlay">
            <span>Click to view full image</span>
          </div>
        </div>
        <h4>{title}</h4>
      </motion.div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <img
          src={imageUrl}
          alt={title}
          style={{ width: "100%", height: "auto", maxHeight: "80vh" }}
        />
        <h3>{title}</h3>
      </Modal>
    </>
  );
};

const CareerPage = () => {
  const dispatch = useDispatch();
  const selectLayoutState = (state) => state.Layout;
  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (layout) => ({
      layoutModeType: layout.layoutModeType,
    })
  );
  const { layoutModeType } = useSelector(selectLayoutProperties);

  useEffect(() => {
    if (layoutModeType) {
      window.dispatchEvent(new Event("resize"));
      dispatch(changeLayoutMode(layoutModeType));
    }
  }, [layoutModeType, dispatch]);
  /*
call dark/light mode
*/
  const onChangeLayoutMode = (value) => {
    if (changeLayoutMode) {
      dispatch(changeLayoutMode(value));
    }
  };
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init("r_SucAvoFwjMMo3Z8"); // Replace with your actual public key
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // Prepare file uploads
      const cvFile = data.cv[0];
      const resumeFile = data.resume[0];

      // Convert files to base64
      const cvBase64 = await fileToBase64(cvFile);
      const resumeBase64 = await fileToBase64(resumeFile);

      // Send email using EmailJS
      const result = await emailjs.send(
        "service_fedq014", // Replace with your service ID
        "template_jwbiih6", // Replace with your template ID
        {
          from_name: data.name,
          from_email: data.email,
          subject: `Job Application - ${data.position}`,
          message: `
            Name: ${data.name}
            Email: ${data.email}
            Position: ${data.position}
            Phone: ${data.phone}

            Cover Letter:
            ${data.coverLetter}
          `,
          cv: cvBase64,
          cv_name: cvFile.name,
          resume: resumeBase64,
          resume_name: resumeFile.name,
        }
      );

      console.log("Email sent successfully:", result);
      setSubmitSuccess(true);
      reset(); // Reset form fields
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitError("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const [mounted, setMounted] = useState(false); // For particle effect mount state

  useEffect(() => {
    setMounted(true);
    initParticles();

    // Cleanup the event listener on unmount
    const handleResize = debounce(() => {
      const canvas = document.getElementById("particle-canvas");
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    }, 200); // Debounce with a 200ms delay

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
  };

  // Debounce function for resize handling
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

  const institutions = [
    {
      name: "O P Jindal University, Raigarh",
      description: "Partnered for educational and professional growth.",
      imageUrl: col4,
    },
    {
      name: "ITM University, Raipur",
      description: "Partnered for educational and professional growth.",
      imageUrl: col1,
    },
    {
      name: "Bhilai Institute of Technology, Durg",
      description: "Partnered for educational and professional growth.",
      imageUrl: col2,
    },
    {
      name: "ICFAI, Raipur",
      description: "Partnered for educational and professional growth.",
      imageUrl: col3,
    },
  ];

  return (
    <div>
      <Navbar
        onChangeLayoutMode={onChangeLayoutMode}
        layoutModeType={layoutModeType}
      />
      {/* Particle canvas */}
      <canvas id="particle-canvas" className="particle-canvas" />

      <div className="career-page">
        <motion.section
          className="hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="hero-content">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Begin Your Journey
            </motion.h1>
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Shape the Future with Us
            </motion.h2>
            <motion.div
              className="hero-decoration"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        </motion.section>

        {/* The rest of your sections */}
        <section className="institutions">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Partner Institutions
          </motion.h2>
          <div className="institutions-grid">
            {institutions.map((institution, index) => (
              <InstitutionCard key={index} {...institution} />
            ))}
          </div>
        </section>

        <section className="certificates">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Recognition & Achievements
          </motion.h2>
          <div className="certificates-grid">
            <CertificateCard imageUrl={cert1} title="Completion Certificate" />
            <CertificateCard imageUrl={cert2} title="Letter of Appreciation" />
          </div>
        </section>

        <section className="application-form">
          <motion.div
            className="form-container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Apply Now</h2>
            <h3>Take the First Step Towards Your Future</h3>

            {submitSuccess && (
              <motion.div
                className="success-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Application submitted successfully! We'll contact you soon.
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <input
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  placeholder="Full Name"
                />
                {errors.name && (
                  <span className="error">{errors.name.message}</span>
                )}
              </div>

              <div className="form-group">
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Email Address"
                />
                {errors.email && (
                  <span className="error">{errors.email.message}</span>
                )}
              </div>

              <div className="form-group">
                <select
                  {...register("position", {
                    required: "Please select a position",
                  })}
                >
                  <option value="">Select Position</option>
                  <option value="intern">Intern</option>
                  <option value="junior">Junior Developer</option>
                  <option value="senior">Senior Developer</option>
                </select>
                {errors.position && (
                  <span className="error">{errors.position.message}</span>
                )}
              </div>

              <div className="form-group">
                <input
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Please enter a valid 10-digit phone number",
                    },
                  })}
                  placeholder="Phone Number"
                />
                {errors.phone && (
                  <span className="error">{errors.phone.message}</span>
                )}
              </div>

              <div className="form-group">
                <label>Upload CV</label>
                <input
                  type="file"
                  {...register("cv", {
                    required: "CV is required",
                  })}
                  accept=".pdf,.doc,.docx"
                />
                {errors.cv && (
                  <span className="error">{errors.cv.message}</span>
                )}
              </div>

              <div className="form-group">
                <label>Upload Resume</label>
                <input
                  type="file"
                  {...register("resume", {
                    required: "Resume is required",
                  })}
                  accept=".pdf,.doc,.docx"
                />
                {errors.resume && (
                  <span className="error">{errors.resume.message}</span>
                )}
              </div>

              <div className="form-group">
                <textarea
                  {...register("coverLetter", {
                    required: "Cover letter is required",
                    minLength: {
                      value: 100,
                      message: "Cover letter must be at least 100 characters",
                    },
                  })}
                  placeholder="Cover Letter"
                  rows="4"
                />
                {errors.coverLetter && (
                  <span className="error">{errors.coverLetter.message}</span>
                )}
              </div>

              <motion.button
                type="submit"
                className={`submit-button ${isSubmitting ? "submitting" : ""}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </motion.button>
            </form>
          </motion.div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default CareerPage;
