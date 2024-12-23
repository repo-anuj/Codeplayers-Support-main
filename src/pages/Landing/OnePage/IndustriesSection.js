import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import steel from "../../../assets/images/industriues/steel-industry.svg";
import restaurant from "../../../assets/images/industriues/restaurants.svg";
import hospital from "../../../assets/images/industriues/hospital.svg";
import educational from "../../../assets/images/industriues/education.svg";
import theater from "../../../assets/images/industriues/theater.svg";
import retail from "../../../assets/images/industriues/retail.png";
import supplier from "../../../assets/images/industriues/supplier.svg";
import industry from "../../../assets/images/industriues/industry.svg";
import "../../../assets/scss/pages/IndustriesSection.scss";

gsap.registerPlugin(Draggable);

const IndustriesSection = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isRotating, setIsRotating] = useState(true);
  const [cardSize, setCardSize] = useState(120); // Fixed card size
  const [duplicateCount, setDuplicateCount] = useState(3); // Fixed duplicate count
  const wheelRef = useRef(null);
  const cardsRef = useRef([]);
  const dragInstanceRef = useRef(null);
  const rotationRef = useRef(null);

  // Your existing industries array (same as before)
  const industries = [
    {
      id: 1,
      title: "Steel Industry",
      subtitle: "Manufacturing Excellence",
      description:
        "Our ERP solutions streamline processes for steel manufacturing and processing, enhancing efficiency and reducing costs.",
      stats: {
        efficiency: 94,
        satisfaction: 92,
        automation: 88,
      },
      img: steel,
      features: ["Real-time Analytics", "Quality Control", "Supply Chain"],
      gradient: "linear-gradient(to bottom right, #2563eb, #60a5fa)",
      iconColor: "#60A5FA",
    },
    {
      id: 2,
      title: "Restaurants",
      subtitle: "Automate with Infinity ERP",
      description:
        "Transform restaurant operations with POS systems, inventory tracking, and customer management tools. Our solution is built to handle high demand and streamline kitchen-to-table services.",
      stats: {
        efficiency: 90,
        satisfaction: 95,
        automation: 85,
      },
      img: restaurant,
      features: ["POS Systems", "Inventory Tracking", "Customer Management"],
      gradient: "linear-gradient(to bottom right, #ff6347, #ff9966)",
      iconColor: "#FF6347",
    },
    {
      id: 3,
      title: "Educational Institutions",
      subtitle: "Automate with Infinity ERP",
      description:
        "Empower educational institutions with digital solutions, such as learning management, administrative tools, and engagement platforms.",
      stats: {
        efficiency: 92,
        satisfaction: 90,
        automation: 87,
      },
      img: educational,
      features: [
        "Learning Management",
        "Administrative Tools",
        "Engagement Platforms",
      ],
      gradient: "linear-gradient(to bottom right, #32cd32, #98fb98)",
      iconColor: "#32CD32",
    },
    {
      id: 4,
      title: "Supplier Management",
      subtitle: "Streamline with Infinity ERP",
      description:
        "Build stronger supplier relationships with easy-to-use procurement and management tools. Our solutions improve transparency and efficiency across your supply chain.",
      stats: {
        efficiency: 91,
        satisfaction: 93,
        automation: 85,
      },
      img: supplier,
      features: [
        "Procurement Tools",
        "Supply Chain Management",
        "Contract Management",
      ],
      gradient: "linear-gradient(to bottom right, #1e90ff, #87cefa)",
      iconColor: "#1E90FF",
    },
    {
      id: 5,
      title: "Hospital Management",
      subtitle: "Simplify with Infinity ERP",
      description:
        "Combine key healthcare functions like patient care, medical records, and administration into one easy-to-use system.",
      stats: {
        efficiency: 93,
        satisfaction: 96,
        automation: 90,
      },
      img: hospital,
      features: ["Patient Care", "Medical Records", "Administration Tools"],
      gradient: "linear-gradient(to bottom right, #00bfff, #87ceeb)",
      iconColor: "#00BFFF",
    },
    {
      id: 6,
      title: "Retail",
      subtitle: "Automate with Infinity ERP",
      description:
        "Optimize retail operations with our ERP solutions, from inventory tracking to sales analytics, ensuring seamless customer experiences.",
      stats: {
        efficiency: 89,
        satisfaction: 91,
        automation: 80,
      },
      img: retail,
      features: [
        "Inventory Tracking",
        "Sales Analytics",
        "Customer Experience",
      ],
      gradient: "linear-gradient(to bottom right, #ff8c00, #ffd700)",
      iconColor: "#FF8C00",
    },
    {
      id: 7,
      title: "Mall & Theater Management",
      subtitle: "Streamline Operations with Infinity ERP",
      description:
        "Easily manage mall and theater operations, from tenant leasing to ticket sales and customer services, all in one platform.",
      stats: {
        efficiency: 92,
        satisfaction: 94,
        automation: 88,
      },
      img: theater,
      features: ["Tenant Leasing", "Ticket Sales", "Customer Services"],
      gradient: "linear-gradient(to bottom right, #8a2be2, #a9a9ff)",
      iconColor: "#8A2BE2",
    },
    {
      id: 8,
      title: "Solvent Plant Management",
      subtitle: "Optimize with Infinity ERP",
      description:
        "Streamline the operations of your solvent extraction plant, from raw material handling to extraction processes and quality control, all in one system.",
      stats: {
        efficiency: 90,
        satisfaction: 91,
        automation: 86,
      },
      img: industry,
      features: [
        "Material Handling",
        "Extraction Processes",
        "Quality Control",
      ],
      gradient: "linear-gradient(to bottom right, #2e8b57, #66cdaa)",
      iconColor: "#2E8B57",
    },
    // Add image property to all other industries...
  ];
  // Adjust card size and duplicate count based on screen size
  // Adjust card size and duplicate count based on screen size
  useEffect(() => {
    setup();
  }, []);

  // Dynamic repeating of industries based on screen size
  const repeatedIndustries = [
    ...industries.map((industry) => ({
      ...industry,
      uniqueId: `${industry.id}-1`,
    })),
    ...(duplicateCount > 1
      ? industries.map((industry) => ({
          ...industry,
          uniqueId: `${industry.id}-1`,
        }))
      : []),
    ...(duplicateCount > 2
      ? industries.map((industry) => ({
          ...industry,
          uniqueId: `${industry.id}-1`,
        }))
      : []),
  ];

  const setup = () => {
    if (!wheelRef.current) return;

    const wheel = wheelRef.current;
    const cards = cardsRef.current;

    // Fixed calculations for consistent wheel size
    const cardCount = cards.length;
    const cardCircumference = cardSize + 20; // Card size + fixed gap
    const radius = (cardCircumference * cardCount) / (2 * Math.PI);
    const slice = 360 / cardCount;
    const DEG2RAD = Math.PI / 180;

    // Position cards
    cards.forEach((card, i) => {
      if (card) {
        gsap.set(card, {
          x: radius + radius * Math.sin(i * slice * DEG2RAD),
          y: radius - radius * Math.cos(i * slice * DEG2RAD),
          rotation: i * slice,
          xPercent: -50,
          yPercent: -50,
          width: cardSize,
          height: cardSize,
        });
      }
    });

    // Set consistent wheel size
    gsap.set(wheel, {
      width: radius * 2,
      height: radius * 2,
      x: "50%",
      xPercent: -50,
      y: "50%",
      yPercent: -50,
    });
  };

  const startRotation = () => {
    if (!isRotating || !wheelRef.current) return;

    // Kill any existing rotation animation
    if (rotationRef.current) {
      rotationRef.current.kill();
    }

    // Create and store the new rotation animation
    rotationRef.current = gsap.to(wheelRef.current, {
      rotation: "+=360",
      duration: 40,
      ease: "none",
      repeat: -1,
    });
  };

  const stopRotation = () => {
    if (rotationRef.current) {
      rotationRef.current.kill();
    }
  };
  const handleCardClick = (industry, index) => {
    // Prevent click handling during drag
    if (dragInstanceRef.current?.isDragging) return;

    const isClosing = selectedCard?.uniqueId === industry.uniqueId;
    setSelectedCard(isClosing ? null : industry);
    setIsRotating(!isClosing);

    stopRotation();

    const cardAngle = (360 / cardsRef.current.length) * index;
    const currentRotation = gsap.getProperty(wheelRef.current, "rotation");
    const targetRotation = Math.round(currentRotation / 360) * 360 - cardAngle;

    gsap.to(wheelRef.current, {
      rotation: targetRotation,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        if (isClosing) {
          setIsRotating(true);
          startRotation();
        }
      },
    });
  };

  const handleOutsideClick = (e) => {
    if (
      selectedCard &&
      !e.target.closest(".industry-card") &&
      !e.target.closest(".description-card")
    ) {
      setSelectedCard(null);
      setIsRotating(true);

      // Add a slight delay before starting rotation to ensure smooth transition
      gsap.delayedCall(0.1, () => {
        startRotation();
      });
    }
  };

  useEffect(() => {
    setup();
    startRotation();

    dragInstanceRef.current = Draggable.create(wheelRef.current, {
      type: "rotation",
      inertia: true,
      onDragStart: () => {
        setIsRotating(false);
        stopRotation();
      },
      onDragEnd: () => {
        if (!selectedCard) {
          setIsRotating(true);
          startRotation();
        }
      },
    })[0];

    window.addEventListener("resize", setup);
    document.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("resize", setup);
      document.removeEventListener("click", handleOutsideClick);
      dragInstanceRef.current?.kill();
      stopRotation();
    };
  }, [duplicateCount, cardSize]);

  // Add effect to handle rotation state changes
  useEffect(() => {
    if (isRotating && !selectedCard) {
      startRotation();
    } else {
      stopRotation();
    }
  }, [isRotating]);

  return (
    <div className="industries-section">
      <div className="industries-section__bg-glow">
        <div className="industries-section__bg-glow-circle" />
      </div>

      <div className="industries-section__container">
        <div className="industries-section__header">
          <h2>
            Industries <span>We Serve</span>
          </h2>
          <p>Transforming businesses through innovative solutions</p>
          <div className="industries-section__header-line" />
        </div>

        <div className="industries-section__wheel-container">
          <div ref={wheelRef} className="wheel">
            {repeatedIndustries.map((industry, index) => (
              <div
                key={industry.uniqueId}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`industries-section__card ${
                  selectedCard?.uniqueId === industry.uniqueId
                    ? "industries-section__card--selected"
                    : ""
                }`}
                onClick={() => handleCardClick(industry, index)}
                style={{
                  width: `${cardSize}px`,
                  height: `${cardSize}px`,
                  background: industry.gradient,
                }}
              >
                <div className="industries-section__card-content">
                  <div>
                    <div className="industries-section__card-icon">
                      <img src={industry.img} alt={industry.title} />
                    </div>
                    <h3 className="industries-section__card-title">
                      {industry.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedCard && (
            <div
              className="industries-section__modal"
              onClick={handleOutsideClick}
            >
              <div
                className="industries-section__modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    setSelectedCard(null);
                    setIsRotating(true);
                    startRotation();
                  }}
                  className="industries-section__modal-close"
                >
                  <X />
                </button>

                <div className="industries-section__modal-header">
                  <h2>{selectedCard.title}</h2>
                  <p>{selectedCard.subtitle}</p>
                </div>

                <div className="industries-section__modal-body">
                  <div className="industries-section__modal-icon">
                    <img src={selectedCard.img} alt={selectedCard.title} />
                  </div>

                  <p className="industries-section__modal-description">
                    {selectedCard.description}
                  </p>

                  <div className="industries-section__modal-features">
                    <h3>Key Features</h3>
                    <div className="industries-section__modal-features-list">
                      {selectedCard.features.map((feature) => (
                        <span key={feature}>{feature}</span>
                      ))}
                    </div>
                  </div>

                  <div className="industries-section__modal-actions">
                    <Link to="/Services_all" className="learn-more-btn">
                      Learn More
                      <ArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndustriesSection;
