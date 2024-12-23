import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsCheckCircle } from "react-icons/bs";
import "./TestimonialSection.scss";

const industries = [
  { id: "steel", label: "Steel" },
  { id: "electronic", label: "Electronic" },
  { id: "it", label: "IT" },
  { id: "construction", label: "Construction" },
  { id: "manufacturing", label: "Manufacturing" },
  { id: "healthcare", label: "Healthcare" },
  { id: "retail", label: "Retail" },
  { id: "automotive", label: "Automotive" },
  { id: "logistics", label: "Logistics" },
  { id: "education", label: "Education" },
];

const testimonials = {
  steel: [
    {
      name: "Robert M.",
      role: "Operations Director",
      company: "SteelTech Solutions",
      content:
        "The ERP system revolutionized our steel manufacturing processes. Real-time inventory tracking and production planning have increased our efficiency by 40%.",
    },
    {
      name: "John D.",
      role: "Plant Manager",
      company: "SteelTech Solutions",
      content:
        "Implementing this ERP solution has improved our production scheduling and quality control across all our manufacturing facilities.",
    },
    {
      name: "Sarah P.",
      role: "Supply Chain Coordinator",
      company: "SteelTech Solutions",
      content:
        "The inventory management and logistics features have streamlined our supply chain, reducing lead times and increasing on-time deliveries.",
    },
  ],
  electronic: [
    {
      name: "Elena G.",
      role: "Product Development Manager",
      company: "Electro Innovations Inc.",
      content:
        "With real-time data insights, we've accelerated product development and minimized delays, enhancing our competitive edge.",
    },
    {
      name: "Carlos T.",
      role: "Quality Assurance Lead",
      company: "Electro Innovations Inc.",
      content:
        "This ERP system's quality control features have helped us achieve higher standards, leading to fewer product returns and satisfied clients.",
    },
    {
      name: "Nina K.",
      role: "Supply Chain Specialist",
      company: "Electro Innovations Inc.",
      content:
        "We’ve optimized our logistics with the ERP's inventory tools, resulting in lower costs and faster time-to-market for new products.",
    },
  ],
  it: [
    {
      name: "Amit S.",
      role: "CTO",
      company: "Tech Solutions Ltd.",
      content:
        "Integrating ERP into our IT services allowed us to monitor project lifecycles seamlessly, boosting team productivity by 30%.",
    },
    {
      name: "Priya R.",
      role: "Project Manager",
      company: "Tech Solutions Ltd.",
      content:
        "The ERP's project tracking capabilities helped us deliver projects on time with enhanced team collaboration and efficiency.",
    },
    {
      name: "Liam J.",
      role: "Service Desk Lead",
      company: "Tech Solutions Ltd.",
      content:
        "The ERP system has streamlined our service ticketing and response times, leading to improved client satisfaction.",
    },
  ],
  construction: [
    {
      name: "Carlos V.",
      role: "Construction Manager",
      company: "BuildRight Corp.",
      content:
        "With this ERP solution, we've improved cost control and project timelines, reducing delays by nearly 25%.",
    },
    {
      name: "Aisha B.",
      role: "Procurement Lead",
      company: "BuildRight Corp.",
      content:
        "Managing supplies and vendor relations has become much easier. Our costs are down, and our vendors are more satisfied.",
    },
    {
      name: "Michael T.",
      role: "Site Engineer",
      company: "BuildRight Corp.",
      content:
        "Real-time access to site data has transformed our workflow, enabling us to make informed decisions quickly.",
    },
  ],
  manufacturing: [
    {
      name: "Emily R.",
      role: "Production Supervisor",
      company: "ManuFact Co.",
      content:
        "We've seen a 50% reduction in downtime thanks to the ERP's machine scheduling and maintenance tracking features.",
    },
    {
      name: "Thomas G.",
      role: "Inventory Control Manager",
      company: "ManuFact Co.",
      content:
        "With ERP, we've optimized our stock levels, cutting excess inventory costs and reducing waste by 20%.",
    },
    {
      name: "Julia C.",
      role: "Process Engineer",
      company: "ManuFact Co.",
      content:
        "The ERP system's real-time analytics provide insights that help us continuously improve manufacturing processes.",
    },
  ],
  healthcare: [
    {
      name: "Dr. Kate S.",
      role: "Medical Director",
      company: "HealthCare Solutions",
      content:
        "Our ERP integration has improved patient data management and scheduling, enhancing the patient experience.",
    },
    {
      name: "Daniel T.",
      role: "Pharmacy Manager",
      company: "HealthCare Solutions",
      content:
        "Inventory management for pharmaceuticals is now more accurate, reducing expired stock and shortages.",
    },
    {
      name: "Linda M.",
      role: "Billing Coordinator",
      company: "HealthCare Solutions",
      content:
        "The ERP system has streamlined billing processes, decreasing billing errors and improving patient satisfaction.",
    },
  ],
  retail: [
    {
      name: "Sophia W.",
      role: "Store Manager",
      company: "RetailHub",
      content:
        "With real-time inventory insights, we can keep our shelves stocked effectively, resulting in happier customers.",
    },
    {
      name: "Ben J.",
      role: "Supply Chain Manager",
      company: "RetailHub",
      content:
        "The ERP has enabled us to better forecast demand, reducing overstock and stockouts across our stores.",
    },
    {
      name: "Rachel P.",
      role: "Customer Relations Lead",
      company: "RetailHub",
      content:
        "Customer satisfaction has increased as we use data insights to personalize our offerings and improve service.",
    },
  ],
  automotive: [
    {
      name: "Marco L.",
      role: "Operations Director",
      company: "AutoWorks Inc.",
      content:
        "We’re now able to monitor every aspect of production and track parts in real time, enhancing overall efficiency.",
    },
    {
      name: "Jane K.",
      role: "Supply Chain Manager",
      company: "AutoWorks Inc.",
      content:
        "This ERP system has streamlined our parts inventory management, reducing lead times significantly.",
    },
    {
      name: "Lucas R.",
      role: "Quality Control Engineer",
      company: "AutoWorks Inc.",
      content:
        "Our product quality has improved thanks to better traceability and process control.",
    },
  ],
  logistics: [
    {
      name: "Emma F.",
      role: "Logistics Manager",
      company: "LogiFast Ltd.",
      content:
        "With real-time tracking and dispatching, we’ve reduced delays and improved customer satisfaction by 25%.",
    },
    {
      name: "Ryan C.",
      role: "Fleet Supervisor",
      company: "LogiFast Ltd.",
      content:
        "Our fleet management has never been smoother; fuel costs are down and driver satisfaction is up.",
    },
    {
      name: "Isabella T.",
      role: "Warehouse Lead",
      company: "LogiFast Ltd.",
      content:
        "Warehouse operations are now more efficient, with improved order accuracy and faster processing times.",
    },
  ],
  education: [
    {
      name: "Dr. Anna Y.",
      role: "Dean",
      company: "Knowledge University",
      content:
        "The ERP system has streamlined our admissions and student data management, providing a better experience for students and staff.",
    },
    {
      name: "Tom S.",
      role: "Registrar",
      company: "Knowledge University",
      content:
        "Course scheduling and faculty management have become significantly easier, enhancing operational efficiency.",
    },
    {
      name: "Linda G.",
      role: "Student Services Coordinator",
      company: "Knowledge University",
      content:
        "With the ERP solution, we can address student needs faster and keep them better informed on administrative processes.",
    },
  ],
};

const TestimonialSection = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("steel");
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Function to get next industry
  const getNextIndustry = (currentIndustry) => {
    const currentIndex = industries.findIndex(
      (ind) => ind.id === currentIndustry
    );
    const nextIndex = (currentIndex + 1) % industries.length;
    return industries[nextIndex].id;
  };

  // Effect for testimonial rotation
  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      const currentIndustryTestimonials = testimonials[selectedIndustry];

      if (currentTestimonialIndex === currentIndustryTestimonials.length - 1) {
        // Last testimonial in current industry, move to next industry
        setSelectedIndustry(getNextIndustry(selectedIndustry));
        setCurrentTestimonialIndex(0);
      } else {
        // Move to next testimonial in current industry
        setCurrentTestimonialIndex(currentTestimonialIndex + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedIndustry, currentTestimonialIndex, isAutoScrolling]);

  // Handle manual industry selection
  const handleIndustryClick = (industryId) => {
    setIsAutoScrolling(false); // Pause auto-scrolling when user interacts
    setSelectedIndustry(industryId);
    setCurrentTestimonialIndex(0);
  };

  // Resume auto-scrolling after user inactivity
  useEffect(() => {
    if (!isAutoScrolling) {
      const timeout = setTimeout(() => {
        setIsAutoScrolling(true);
      }, 10000); // Resume after 10 seconds of inactivity

      return () => clearTimeout(timeout);
    }
  }, [isAutoScrolling]);

  return (
    <div className="testimonial-section" id="reviews">
      <div className="testimonial-header">
        <a href="#" className="show-for">
          Show who it's for
        </a>
        <h2>Support your business, big or small</h2>
        <p>
          Discover how our ERP solutions are transforming businesses across
          different industries. See what our clients say about their experience
          and the real-world impact on their operations.
        </p>
      </div>

      <div className="testimonial-content">
        <div className="industry-buttons">
          {industries.map((industry) => (
            <motion.button
              key={industry.id}
              onClick={() => handleIndustryClick(industry.id)}
              className={`industry-button ${
                selectedIndustry === industry.id ? "active" : ""
              }`}
              animate={{
                scale: selectedIndustry === industry.id ? 1.05 : 1,
                transition: { duration: 0.2 },
              }}
            >
              <BsCheckCircle />
              <span>{industry.label}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedIndustry}-${currentTestimonialIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="testimonial-card"
          >
            <div className="testimonial-author">
              <div className="author-avatar">
                {testimonials[selectedIndustry][
                  currentTestimonialIndex
                ].name.charAt(0)}
              </div>
              <div className="author-info">
                <h3>
                  {testimonials[selectedIndustry][currentTestimonialIndex].name}
                </h3>
                <p>
                  {testimonials[selectedIndustry][currentTestimonialIndex].role}{" "}
                  -{" "}
                  {
                    testimonials[selectedIndustry][currentTestimonialIndex]
                      .company
                  }
                </p>
              </div>
            </div>
            <p className="testimonial-text">
              {testimonials[selectedIndustry][currentTestimonialIndex].content}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TestimonialSection;
