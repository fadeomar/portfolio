import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./style.css";

const animations = {
  Slide: [
    "slide-in-down",
    "slide-in-left",
    "slide-in-right",
    "slide-in-up",
    "slide-out-up",
    "slide-out-down",
    "slide-out-left",
    "slide-out-right",
  ],
  Fade: [
    "fade-in",
    "fade-out",
    "fade-in-down",
    "fade-in-left",
    "fade-in-up",
    "fade-in-right",
    "fade-out-down",
    "fade-out-left",
    "fade-out-up",
    "fade-out-right",
  ],
  Zoom: [
    "zoom-in",
    "zoom-in-down",
    "zoom-in-left",
    "zoom-in-right",
    "zoom-in-up",
    "zoom-out",
    "zoom-out-down",
    "zoom-out-left",
    "zoom-out-right",
    "zoom-out-up",
  ],
  Bounce: [
    "bounce-in",
    "bounce-in-down",
    "bounce-in-left",
    "bounce-in-right",
    "bounce-in-up",
    "bounce-out",
    "bounce-out-down",
    "bounce-out-left",
    "bounce-out-right",
    "bounce-out-up",
  ],
  Flip: ["flip-in-x", "flip-in-y", "flip-out-x", "flip-out-y"],
  Rotate: [
    "rotate-out",
    "rotate-out-down-left",
    "rotate-out-down-right",
    "rotate-out-up-left",
    "rotate-out-up-right",
    "rotate-in",
    "rotate-in-down-left",
    "rotate-in-down-right",
    "rotate-in-up-left",
    "rotate-in-up-right",
  ],
  Other: [
    "flash",
    "pulse",
    "rubber-band",
    "shake",
    "swing",
    "tada",
    "light-speed-out",
    "light-speed-in",
    "wobble",
    "skew",
    "pop-in",
    "fade-in-scale",
    "swing-right",
    "swing-left",
    "slide-bounce",
    "rubber-bounce",
    "jello",
    "flip-vertical",
    "flip-horizontal",
    "blink",
    "slide-flip",
    "spin",
    "heart-beat",
    "rubber-band-in",
    "bounce-in-left",
    "hinge",
    "jack-in-the-box",
    "roll",
  ],
  // Add more categories and animations
};

function formatText(str) {
  return str
    .split("-") // Split the string by hyphens
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words with spaces
}

const Sidebar = ({ onSelect }) => {
  const [expanded, setExpanded] = useState({
    Slide: true, // Default expanded category
  });

  const [activeItem, setActiveItem] = useState(null); // State to track the active item

  const toggleCategory = (category) => {
    setExpanded((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
    onSelect(item);
    setTimeout(() => {
      onSelect("");
    }, 1000);
  };

  return (
    <div className="sidebar">
      <ul>
        {Object.keys(animations).map((category) => (
          <li key={category}>
            <button
              className="category-button"
              onClick={() => toggleCategory(category)}
              aria-expanded={expanded[category] ? "true" : "false"}
            >
              <motion.span
                className="arrow"
                animate={{ rotate: expanded[category] ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▸
              </motion.span>
              {category}
            </button>
            <AnimatePresence initial={false}>
              {expanded[category] && (
                <motion.ul
                  className="nested-list"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {animations[category].map((animation) => (
                    <li
                      key={animation}
                      className={activeItem === animation ? "active" : ""}
                      onClick={() => handleItemClick(animation)}
                    >
                      {formatText(animation)}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
