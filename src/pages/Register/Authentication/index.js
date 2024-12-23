import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {Alert, Card, CardBody, Col, Container, Row, Form, FormFeedback, Input, Button, ButtonGroup, UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import ParticlesAuth from "./../AuthenticationInner/ParticlesAuth";
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
// Import images 
import logoLight from "../../../assets/images/logo-light.png";
import { POST_Vendor_Register } from '../../../slices/Register/Authentication/thunk';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
const BasicSignUp = () => {
    
    const dispatch=useDispatch();
    const [selectedUserType, setSelectedUserType] = useState("Infinity-ERP");
    const [passwordShow, setPasswordShow] = useState(false);
    const navigate = useNavigate();
    const data = useSelector((state) => state.Register.data);
    const loading = useSelector((state) => state.Register.loading);
    const error = useSelector((state) => state.Register.error);
    const success = useSelector((state) => state.Register.success);
    // Function to handle dropdown item click
    const handleSelect = (userType) => {
        setSelectedUserType(userType);
        validation.setFieldValue("userType", userType); // Update formik value
    };
    useEffect(() => {
        if (success) {
            navigate('/Login')
        }
        else {
            console.log(JSON.stringify(error));
        }
    }, [success, navigate, error]);
    const validation = useFormik({
        

        initialValues: {
            password: "",
            userName: "",
            userType: selectedUserType,
            mobileNumber: "",  // Added mobile number field
            gstin: "",         // Added GSTIN field
        },

        validationSchema: Yup.object({
            userName: Yup.string().required("This field is required"),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .matches(RegExp('(.*[a-z].*)'), 'At least one lowercase letter')
                .matches(RegExp('(.*[A-Z].*)'), 'At least one uppercase letter')
                .matches(RegExp('(.*[0-9].*)'), 'At least one number')
                .required("This field is required"),
            userType: Yup.string().required("Please select a user type"),
            mobileNumber: Yup.string()
                .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
                .required("This field is required"),
            gstin: Yup.string()
                .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/, 'Invalid GSTIN format') // GSTIN format validation
                  // GSTIN required validation
        }),

        onSubmit: (values) => {
            
                
                dispatch(POST_Vendor_Register(values));
                
                
            
        }
    });
    

    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className="auth-page-content mt-lg-5">
                    {loading && (
                        <div className="loader-overlay">
                            <div className="loader-container">
                                <l-infinity
                                    size="55"
                                    stroke="4"
                                    stroke-length="0.15"
                                    bg-opacity="0.1"
                                    speed="1.3"
                                    color="white"
                                ></l-infinity>
                                <p className="validating-message">Validating the User...</p>
                            </div>
                        </div>
                    )}
                    <Container>
                        

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4 card-bg-fill">
                                    <CardBody className="p-4">
                                        {error && <Alert color="danger"> {error} </Alert>}

                                        <div className="p-2 mt-4">
                                            <Form onSubmit={validation.handleSubmit} className="needs-validation" action="#">

                                                {/* User Type Field */}
                                                <div className="mb-3">
                                                    <label htmlFor="userType" className="form-label">
                                                        Licsence Product type <span className="text-danger">*</span>
                                                    </label>
                                                    <ButtonGroup className="w-100"> {/* Full width applied to the ButtonGroup */}
                                                        <UncontrolledDropdown className="w-100">
                                                            <DropdownToggle
                                                                tag="button"
                                                                className="btn btn-light w-100"  
                                                                // {/* Full width applied to the button */}
                                                            >
                                                                {selectedUserType} <i className="mdi mdi-chevron-down"></i>
                                                            </DropdownToggle>
                                                            <DropdownMenu className="w-100"> {/* Ensure DropdownMenu also matches the width */}
                                                                <DropdownItem onClick={() => handleSelect("Infinity-ERP")}>Infinity-ERP</DropdownItem>
                                                                <DropdownItem onClick={() => handleSelect("Vend-X")}>Vend-X</DropdownItem>
                                                            </DropdownMenu>
                                                        </UncontrolledDropdown>
                                                    </ButtonGroup>
                                                    {validation.errors.userType && (
                                                        <FormFeedback type="invalid" className="d-block">
                                                            {validation.errors.userType}
                                                        </FormFeedback>
                                                    )}
                                                </div>

                                                    
                                                {/* Username Field */}
                                                <div className="mb-3">
                                                    <label htmlFor="username" className="form-label">Username <span className="text-danger">*</span></label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="username"
                                                        placeholder="Enter Username"
                                                        name="userName"
                                                        value={validation.values.userName}
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        required
                                                    />
                                                    {validation.errors.userName && validation.touched.userName ? (
                                                        <FormFeedback type="invalid">{validation.errors.userName}</FormFeedback>
                                                    ) : null}
                                                </div>

                                                {/* Mobile Number Field */}
                                                <div className="mb-3">
                                                    <label htmlFor="mobileNumber" className="form-label">
                                                        WhatsApp Mobile Number <span className="text-danger">*</span>
                                                    </label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                                <i className="bx bxl-whatsapp" style={{ fontSize: "1.5em", paddingRight: "5px", color: "#25D366" }}></i>
                                                            </span>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="mobileNumber"
                                                            placeholder="Enter mobile number"
                                                            name="mobileNumber"
                                                            value={validation.values.mobileNumber}
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            required
                                                        />
                                                    </div>
                                                    {validation.errors.mobileNumber && validation.touched.mobileNumber ? (
                                                        <FormFeedback type="invalid">{validation.errors.mobileNumber}</FormFeedback>
                                                    ) : null}
                                                </div>

                                                {/* Mobile Number */}
                                                <div className="mb-3">
                                                    <label htmlFor="gstin" className="form-label">
                                                        GSTIN 
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="gstin"
                                                        placeholder="Enter GSTIN"
                                                        name="gstin"
                                                        value={validation.values.gstin}
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        required
                                                    />
                                                    {validation.errors.gstin && validation.touched.gstin ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.gstin}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                                {/* Password Field */}
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="password-input">Create Password</label>
                                                    <div className="position-relative auth-pass-inputgroup">
                                                        <Input
                                                            type={passwordShow ? "text" : "password"}
                                                            className="form-control pe-5 password-input"
                                                            placeholder="Enter password"
                                                            id="password-input"
                                                            name="password"
                                                            value={validation.values.password}
                                                            onBlur={validation.handleBlur}
                                                            onChange={validation.handleChange}
                                                            invalid={validation.errors.password && validation.touched.password ? true : false}
                                                        />
                                                        {validation.errors.password && validation.touched.password ? (
                                                            <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                        ) : null}
                                                        <Button
                                                            color="link"
                                                            onClick={() => setPasswordShow(!passwordShow)}
                                                            className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon material-shadow-none"
                                                            type="button"
                                                            id="password-addon">
                                                            <i className="ri-eye-fill align-middle"></i>
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className="mb-4">
                                                    <p className="mb-0 fs-12 text-muted fst-italic">By registering you agree to the
                                                        <Link to="#" className="text-primary text-decoration-underline fst-normal fw-medium">Terms of Use</Link></p>
                                                </div>

                                                <div className="mt-4">
                                                    <button className="btn btn-success w-100" type="submit">Sign Up</button>
                                                </div>


                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>

                                <div className="mt-4 text-center">
                                    <p className="mb-0">Already have an account? <Link to="/ERPLogin" className="fw-semibold text-primary text-decoration-underline"> Sign in </Link></p>
                                </div>

                            </Col>
                        </Row>
                    </Container>
                    <style jsx>{`
            .loader-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: #092537;
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 9999;
            }
            .loader-container {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .validating-message {
              margin-top: 15px;
              color: white;
              font-size: 1.2rem;
              font-weight: bold;
            }
          `}</style>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default BasicSignUp;
