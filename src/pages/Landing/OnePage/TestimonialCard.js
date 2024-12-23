import { motion } from "framer-motion";

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      className="testimonial-card"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="testimonial-author">
        <div className="author-avatar">{testimonial.name.charAt(0)}</div>
        <div className="author-info">
          <h3>{testimonial.name}</h3>
          <p>
            {testimonial.role} - {testimonial.company}
          </p>
        </div>
      </div>
      <p className="testimonial-text">{testimonial.content}</p>
    </motion.div>
  );
};

export default TestimonialCard;
