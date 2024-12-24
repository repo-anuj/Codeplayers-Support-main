// FlipCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './FlipCard.scss';

const FlipCard = ({ image, title, description, subtitle, rotate = 'y' }) => {
  const variants = {
    front: {
      rotateY: rotate === 'y' ? 0 : undefined,
      rotateX: rotate === 'x' ? 0 : undefined,
    },
    back: {
      rotateY: rotate === 'y' ? 180 : undefined,
      rotateX: rotate === 'x' ? 180 : undefined,
    }
  };

  return (
    <div className="flip-card">
      <motion.div 
        className="flip-card__inner"
        whileHover={rotate === 'y' ? { rotateY: 180 } : { rotateX: 180 }}
        transition={{ duration: 0.5 }}
      >
        {/* Front */}
        <motion.div 
          className="flip-card__front"
          variants={variants}
          initial="front"
        >
          <img
            src={image}
            alt="card front"
            className="flip-card__image"
          />
          <div className="flip-card__title">{title}</div>
        </motion.div>

        {/* Back */}
        <motion.div 
          className="flip-card__back"
          variants={variants}
          initial="back"
        >
          <div className="flip-card__content">
            <h1 className="flip-card__subtitle">{subtitle}</h1>
            <p className="flip-card__description">{description}</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FlipCard;