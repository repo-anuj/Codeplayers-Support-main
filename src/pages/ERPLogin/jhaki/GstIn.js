import React, { useState, useEffect } from "react";
import { Button, Typography, Box, CssBaseline, Link } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "./GSTIn.scss";
import RegistrationForm from "./Registration";

const GSTIn = () => {
  const [gstNumber, setGstNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const userData = { username: "27AAPFU0939F1ZV" };
    if (isValidGSTIN(userData.username)) {
      setGstNumber(userData.username);
      setIsValid(true);
    }
  }, []);

  const isValidGSTIN = (gstin) => {
    const gstinRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstinRegex.test(gstin);
  };

  const handleInputChange = (e) => {
    const input = e.target.value.toUpperCase();
    setGstNumber(input);
    setIsValid(isValidGSTIN(input));
  };

  const handleSubmit = () => {
    if (isValid) {
      setStep(2);
    } else {
      toast.error("Invalid GST number!"); // Show error toast if invalid
    }
  };

  const progress = (step / 3) * 100;

  return (
    <div className="container">
      <CssBaseline />
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      <Box className="form-container">
        <Typography variant="h4" component="h2" className="header">
          Welcome to Our ERP
        </Typography>
        <Typography variant="body1" className="header">
          Please enter your GST number to get started
        </Typography>

        {/* Steps */}
        <div className="steps">
          <div className="step-indicator">
            {[1, 2, 3].map((i) => (
              <div key={i} className="step">
                <div
                  className={`circle ${
                    step > i ? "completed" : step === i ? "active" : ""
                  }`}
                >
                  {step > i ? <i className="fas fa-check"></i> : i}
                </div>
                <div
                  className={`step-label ${step >= i ? "active-label" : ""}`}
                >
                  {i === 1
                    ? "GST Number"
                    : i === 2
                    ? "Registration"
                    : "Industry"}
                </div>
                {i < 3 && (
                  <div className={`line ${step > i ? "completed-line" : ""}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="input-container">
          <input
            type="text"
            value={gstNumber}
            onChange={handleInputChange}
            placeholder="GST Number"
            className={`input ${isValid ? "valid" : ""}`}
          />
          {isValid && <p className="valid-feedback">Valid GST Number</p>}
        </div>

        {/* Link Navigation for the Next Step */}
        <Link
          to={isValid ? "/registration" : "#"}
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={!isValid}
            className={`submit-btn ${isValid ? "enabled" : "disabled"}`}
            onClick={handleSubmit}
          >
            Next Step
          </Button>
        </Link>
      </Box>
      <RegistrationForm />
      {/* Toastify Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default GSTIn;
