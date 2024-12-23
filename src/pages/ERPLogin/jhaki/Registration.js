// Registration.js
import React, { useState } from "react";
import "./Registration.scss";
import {
  FaGoogle,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaBuilding,
  FaHome,
} from "react-icons/fa";
import Logo from "../../../assets/INFINITY.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    address: "",
    address2: "",
    email: "",
    // password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <ParticlesAuth>
      <div className="registration-container">
        <div className="registration-card">
          <div className="logo-container">
            <img
              src={Logo}
              alt="CodePlayer Logo"
              className="logo"
              // style={{ width: "150px", height: "auto" }}
            />
          </div>

          <h1>Welcome to Vendor Registration</h1>
          <p className="subtitle">Register your organization to get started</p>

          <form onSubmit={handleSubmit}>
            <div className="name-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Company Name</label>
              <div className="input-icon-wrapper">
                <FaBuilding className="input-icon" />
                <input
                  type="text"
                  name="companyName"
                  placeholder="Enter company name"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-icon-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* <div className="form-group">
              <label>Password</label>
              <div className="input-icon-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={handleChange}
                />
              </div>
            </div> */}

            <div className="form-group">
              <label>Phone Number</label>
              <div className="input-icon-wrapper">
                <FaPhone className="input-icon" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Address1</label>
              <div className="input-icon-wrapper">
                <FaHome className="input-icon" />
                <input
                  type="text"
                  name="address"
                  placeholder="Enter address"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Address 2</label>
              <div className="input-icon-wrapper">
                <FaHome className="input-icon" />
                <input
                  type="text"
                  name="address2"
                  placeholder="Enter address 2"
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Continue
            </button>

            <div className="divider">
              <span>Or continue with</span>
            </div>

            <button type="button" className="google-btn">
              <FaGoogle />
              <span>Sign up with Google</span>
            </button>

            <p className="signin-link">
              Already have an account? <a href="/login">Sign in</a>
            </p>
          </form>
        </div>
      </div>
    </ParticlesAuth>
  );
};

export default Registration;
