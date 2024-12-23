import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { BsLink45Deg, BsArrowUpRight, BsTools } from "react-icons/bs";
import "../../../assets/scss/pages/Achievement.scss";

const achievementData = [
  {
    id: 1,
    title: "Faster uploads",
    icon: <BsArrowUpRight />,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe deserunt ipsum rerum natus fugit ex minima voluptas ratione quaerat. Ea!",
    isDark: false,
  },
  {
    id: 2,
    title: "99.99% uptime",
    icon: <BsArrowUpRight />,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, vitae sed? Maxime!",
    isDark: true,
  },
  {
    id: 3,
    title: "500+ integrations",
    icon: <BsLink45Deg />,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, vitae sed? Maxime!",
    isDark: true,
  },
  {
    id: 4,
    title: "Modern tooling",
    icon: <BsTools />,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, saepe quo!",
    isDark: false,
  },
];

const AchievementCard = ({
  data,
  isStacked,
  stackIndex,
  isActive,
  position,
}) => {
  return (
    <motion.div
      className={`achievement-card ${data.isDark ? "dark" : "light"}`}
      initial={isActive ? { x: "100%", opacity: 0 } : false}
      animate={{
        x: isStacked ? `-50%` : `calc(-50% + ${position * 110}%)`,
        y: isStacked ? stackIndex * 10 : 0,
        scale: isStacked ? 1 : Math.abs(position) > 1 ? 0.8 : 1,
        opacity: isStacked ? 1 : Math.abs(position) > 1 ? 0.3 : 1,
        zIndex: isStacked ? 1 - stackIndex : 1 - Math.abs(position),
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="card-stripe" />
      <div className="card-content">
        <div className="card-header">
          <h2>{data.title}</h2>
          <div className="icon-container">{data.icon}</div>
        </div>
        <p>{data.description}</p>
      </div>
    </motion.div>
  );
};

const Achievements = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stackedCards, setStackedCards] = useState([]);

  const handleNext = () => {
    if (activeIndex < achievementData.length - 1) {
      setStackedCards([...stackedCards, activeIndex]);
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (stackedCards.length > 0) {
      const newStacked = [...stackedCards];
      newStacked.pop();
      setStackedCards(newStacked);
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <div className="achievements-container">
      <div className="header">
        <h1 className="title">
          We're good. <span>Here's why.</span>
        </h1>
        <div className="navigation-buttons">
          <button
            onClick={handlePrev}
            className="nav-button"
            disabled={stackedCards.length === 0}
          >
            <BsArrowLeft />
          </button>
          <button
            onClick={handleNext}
            className="nav-button"
            disabled={activeIndex === achievementData.length - 1}
          >
            <BsArrowRight />
          </button>
        </div>
      </div>

      <div className="cards-section">
        {/* Stacked Cards */}
        {stackedCards.map((index, stackIndex) => (
          <AchievementCard
            key={`stacked-${achievementData[index].id}`}
            data={achievementData[index]}
            isStacked={true}
            stackIndex={stackIndex}
            position={0}
          />
        ))}

        {/* Active and Upcoming Cards */}
        {achievementData.map((data, index) => {
          if (index >= activeIndex && !stackedCards.includes(index)) {
            return (
              <AchievementCard
                key={`active-${data.id}`}
                data={data}
                isStacked={false}
                isActive={index === activeIndex}
                position={index - activeIndex}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Achievements;
