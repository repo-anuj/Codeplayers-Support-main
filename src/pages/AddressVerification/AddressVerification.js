import React, { useState } from "react";
import Settings from "./Settings";

const AddressVerification = () => {
    const [selectedCategories, setSelectedCategories] = useState(new Set());

    return (
        <div className="address-verification-container">
            <Settings selectedCategories={(selectedCategories)} setSelectedCategories={setSelectedCategories} />
        </div>
    );
};

export default AddressVerification;
