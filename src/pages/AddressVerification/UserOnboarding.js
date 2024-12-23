// UserOnboarding.js
import React from "react";
import {
    FaLaptopCode, FaMicrochip, FaHardHat, FaCar, FaTshirt, FaMedkit,
    FaUtensils, FaCouch, FaTractor, FaPencilAlt, FaIndustry, FaEllipsisH
} from "react-icons/fa";
import "./UserOnboarding.scss";
import { Button,Input,Modal,Label,ModalHeader,ModalFooter,ModalBody } from "reactstrap";
import { useState } from "react";
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

const UserOnboarding = ({ selectedCategories, setSelectedCategories,onSave }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [selectedFeatures, setSelectedFeatures] = useState(new Set());

    const toggleCategory = (category) => {
        setCurrentCategory(category);
        const existingCategory = selectedCategories[category.id];
        setSelectedFeatures(new Set(existingCategory ? existingCategory.features : [])); // Initialize selected features
        setModalOpen(true); // Open modal
    };

    const toggleFeature = (feature) => {
        setSelectedFeatures((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(feature)) newSet.delete(feature);
            else newSet.add(feature);
            return newSet;
        });
    };

    const saveCategorySelection = () => {
        setSelectedCategories((prev) => ({
            ...prev,
            [currentCategory.id]: {
                id: currentCategory.id,
                title: currentCategory.title,
                features: Array.from(selectedFeatures),
            },
        }));
        setModalOpen(false); // Close modal
        setCurrentCategory(null); // Reset current category
    };

    const clearSelection = () => {
        setSelectedCategories({});
    };


    return (
        <div className="onboarding-container">
            <div className="onboarding-card">
                <h1>Select Your Business Categories</h1>
                <p>Choose the categories that best describe your business needs</p>

                <div className="category-grid">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className={`category-card ${selectedCategories[category.id] ? "selected" : ""}`}
                            onClick={() => toggleCategory(category)}
                        >
                            <div className="icon-wrapper">{category.icon}</div>
                            <h3>{category.title}</h3>
                        </div>
                    ))}
                </div>


                <Button
                    className={`continue-button ${Object.keys(selectedCategories).length > 0 ? "active" : ""}`}
                    disabled={Object.keys(selectedCategories).length === 0}
                    onClick={onSave}
                >
                    Next
                </Button>
                <Button
                    className="clear-button"
                    onClick={clearSelection}
                    disabled={Object.keys(selectedCategories).length === 0}
                >
                    Clear Selection
                </Button>
            </div>

            <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
                <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
                    Select Features for {currentCategory?.title}
                </ModalHeader>
                <ModalBody>
                    {currentCategory?.features.map((feature) => (
                        <div key={feature}>
                            <input
                                type="checkbox"
                                checked={selectedFeatures.has(feature)}
                                onChange={() => toggleFeature(feature)}
                            />
                            <label>{feature}</label>
                        </div>
                    ))}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={saveCategorySelection}>
                        Next
                    </Button>
                    <Button color="secondary" onClick={() => setModalOpen(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default UserOnboarding;
