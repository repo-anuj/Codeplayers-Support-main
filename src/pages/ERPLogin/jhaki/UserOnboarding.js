import React, { useState } from "react";
import { Check } from "lucide-react";
import "./UserOnboarding.scss";
import {
  FaLaptopCode,
  FaMicrochip,
  FaHardHat,
  FaCar,
  FaTshirt,
  FaMedkit,
  FaUtensils,
  FaCouch,
  FaTractor,
  FaPencilAlt,
  FaIndustry,
  FaEllipsisH,
} from "react-icons/fa";

const categories = [
  {
    id: 1,
    title: "IT & Technology",
    icon: <FaLaptopCode />,
    features: [
      "Computers & Laptops",
      "Software & Applications",
      "Network Equipment",
      "IT Hardware",
      "Cloud Services",
      "Mobile Devices & Accessories",
    ],
  },
  {
    id: 2,
    title: "Electronics & Electricals",
    icon: <FaMicrochip />,
    features: [
      "Electrical Wires & Cables",
      "Circuit Components",
      "Batteries & Power Supplies",
      "Lighting & Fixtures",
      "Home Appliances",
      "Industrial Electronics",
    ],
  },
  {
    id: 3,
    title: "Building & Construction",
    icon: <FaHardHat />,
    features: [
      "Construction Materials",
      "Tools & Machinery",
      "Plumbing Supplies",
      "Flooring & Tiles",
      "Paints & Coatings",
      "Safety & Security Equipment",
    ],
  },
  {
    id: 4,
    title: "Automotive & Transport",
    icon: <FaCar />,
    features: [
      "Auto Parts & Accessories",
      "Tires & Batteries",
      "Vehicle Electronics",
      "Fuel & Lubricants",
      "Industrial Transport",
    ],
  },
  {
    id: 5,
    title: "Fashion & Apparel",
    icon: <FaTshirt />,
    features: [
      "Clothing & Textiles",
      "Footwear",
      "Jewelry & Accessories",
      "Bags & Luggage",
    ],
  },
  {
    id: 6,
    title: "Health & Personal Care",
    icon: <FaMedkit />,
    features: [
      "Medical Supplies & Equipment",
      "Personal Care Products",
      "Pharmaceuticals",
      "Fitness Equipment",
    ],
  },
  {
    id: 7,
    title: "Food & Beverages",
    icon: <FaUtensils />,
    features: [
      "Fresh Produce",
      "Packaged Foods",
      "Beverages",
      "Bakery & Confectionery",
      "Foodservice Supplies",
    ],
  },
  {
    id: 8,
    title: "Furniture & Home Goods",
    icon: <FaCouch />,
    features: [
      "Furniture",
      "Home Decor",
      "Bedding & Textiles",
      "Kitchenware",
      "Cleaning Supplies",
    ],
  },
  {
    id: 9,
    title: "Agriculture & Farming",
    icon: <FaTractor />,
    features: [
      "Seeds & Fertilizers",
      "Agricultural Machinery",
      "Animal Feed & Supplies",
      "Horticulture Tools",
    ],
  },
  {
    id: 10,
    title: "Stationery & Office Supplies",
    icon: <FaPencilAlt />,
    features: [
      "Office Equipment",
      "Stationery Items",
      "Printing Supplies",
      "Office Furniture",
    ],
  },
  {
    id: 11,
    title: "Industrial Equipment",
    icon: <FaIndustry />,
    features: [
      "Manufacturing Tools",
      "Heavy Machinery",
      "Industrial Safety Gear",
      "Welding Equipment",
      "Lubricants & Oils",
    ],
  },
  {
    id: 12,
    title: "Others",
    icon: <FaEllipsisH />,
    features: [
      "Event & Party Supplies",
      "Sports & Outdoors",
      "Toys & Hobbies",
      "Pet Supplies",
    ],
  },
];

const UserOnboarding = () => {
  const [selectedCategories, setSelectedCategories] = useState(new Set());

  const toggleCategory = (id) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        <div className="header">
          <h1>Select Your Business Categories</h1>
          <p>Choose the categories that best describe your business needs</p>
        </div>

        <div className="category-grid">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`category-card ${
                selectedCategories.has(category.id) ? "selected" : ""
              }`}
              onClick={() => toggleCategory(category.id)}
              style={{ "--index": index }}
            >
              <div className="icon-wrapper">{category.icon}</div>
              {/* {selectedCategories.has(category.id) && (
                // <div className="checkmark">
                //   <Check />
                // </div>
              )} */}
              <h3>{category.title}</h3>
              <div className="features">
                {category.features.map((feature, idx) => (
                  <span key={idx} className="feature-tag">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          className={`continue-button ${
            selectedCategories.size > 0 ? "active" : ""
          }`}
          disabled={selectedCategories.size === 0}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default UserOnboarding;
