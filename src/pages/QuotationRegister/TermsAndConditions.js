import React, { useEffect, useState } from "react";

const TermsAndConditions = ({ onDataChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [vendorInputs, setVendorInputs] = useState({
    vendorInput1: "",
    vendorInput2: "",
    vendorInput3: "",
    vendorInput4: "",
    vendorInput5: "",
  });

  const [checkboxes, setCheckboxes] = useState({
    vendorDemand1: false,
    vendorDemand2: false,
    vendorDemand3: false,
    vendorDemand4: false,
    vendorDemand5: false,
  });

  const companyRequirements = [
    { key: "Delivery", requiredTerms: "fast in 2-3 days" },
    { key: "Warranty", requiredTerms: "1 year warranty" },
    { key: "Payment", requiredTerms: "in 15 days" },
    { key: "Inspections", requiredTerms: "Report within 48 hours" },
    { key: "Transportation", requiredTerms: "Transportation from vendor side" },
  ];

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setCheckboxes((prev) => ({ ...prev, [id]: checked }));

    const index = id.replace("vendorDemand", "");
    if (checked) {
      setVendorInputs((prev) => ({
        ...prev,
        [`vendorInput${index}`]: companyRequirements[index - 1].requiredTerms,
      }));
    } else {
      setVendorInputs((prev) => ({
        ...prev,
        [`vendorInput${index}`]: "",
      }));
    }
  };

  const handleVendorInputChange = (index, value) => {
    setVendorInputs((prev) => ({
      ...prev,
      [`vendorInput${index}`]: value,
    }));
  };

  // Update data in parent whenever checkboxes or vendorInputs change
  useEffect(() => {
    const data = companyRequirements.map((requirement, index) => ({
      key: requirement.key,
      checkbox: checkboxes[`vendorDemand${index + 1}`],
      requiredTerms: requirement.requiredTerms,
      vendorResponse: vendorInputs[`vendorInput${index + 1}`],
    }));
    onDataChange(data);
  }, [vendorInputs, checkboxes]);

  return (
    <div className="accordion mt-4 w-100" id="termsAccordion">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTerms">
          <button
            className={`accordion-button ${isOpen ? "" : "collapsed"}`}
            type="button"
            onClick={toggleAccordion}
            aria-expanded={isOpen}
            aria-controls="collapseTerms"
          >
            Terms & Conditions
          </button>
        </h2>
        <div
          id="collapseTerms"
          className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
          aria-labelledby="headingTerms"
          data-bs-parent="#termsAccordion"
        >
          <div className="accordion-body" style={{ fontSize: "0.85rem" }}>
            <div className="table-responsive w-100">
              <table className="table table-bordered w-100">
                <thead>
                  <tr>
                    <th scope="col">Terms</th>
                    <th scope="col">Company Requirement</th>
                    <th scope="col">Vendor Submission</th>
                  </tr>
                </thead>
                <tbody>
                  {companyRequirements.map((requirement, index) => (
                    <tr key={index}>
                      <td>{requirement.key}</td>
                      <td>
                        <label htmlFor={`company-demand-${index + 1}`}>
                          {requirement.requiredTerms}
                        </label>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <input
                            type="checkbox"
                            id={`vendorDemand${index + 1}`}
                            checked={checkboxes[`vendorDemand${index + 1}`]}
                            onChange={handleCheckboxChange}
                          />
                          <input
                            type="text"
                            placeholder="Vendor Input"
                            className="form-control ms-2"
                            value={vendorInputs[`vendorInput${index + 1}`]}
                            onChange={(e) =>
                              handleVendorInputChange(index + 1, e.target.value)
                            }
                            disabled={checkboxes[`vendorDemand${index + 1}`]}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
