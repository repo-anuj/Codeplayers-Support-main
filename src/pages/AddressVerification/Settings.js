import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane, Button,Form,Label,Input,FormFeedback } from 'reactstrap';
import classnames from "classnames";
import UserOnboarding from './UserOnboarding';
import progileBg from '../../assets/images/profile-bg.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch,useSelector } from 'react-redux';
import { POST_Address_details } from '../../slices/thunks';
import ParticlesAuth from '../ERPLogin/AuthenticationInner/ParticlesAuth';
import countries from './Countries';
const Settings = ({ selectedCategories, setSelectedCategories }) => {
    const dispatch=useDispatch();
    const data = useSelector((state) => state.AddressDetails.data);
    const loading = useSelector((state) => state.AddressDetails.loading);
    const error = useSelector((state) => state.AddressDetails.error);
    const success = useSelector((state) => state.AddressDetails.success);
    const [activeTab, setActiveTab] = useState("1");
    const navigate=useNavigate();
    const tabChange = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    const [mobile,setMobile]=useState("");
    useEffect(() => {
        const storedMobileNumber = localStorage.getItem("mobileNumber");
        if (storedMobileNumber) {
            setMobile(storedMobileNumber);
        }
    }, []);
    const [gstin, setGstin] = useState("");
    useEffect(() => {
        const storedGSTIN = localStorage.getItem("gstin");
        if (storedGSTIN) {
            setGstin(storedGSTIN);
        }
    }, []);
    const [username,setUsername]=useState("");
    useEffect(() => {
        const storedUsername = localStorage.getItem("userName");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []); // Added dependency array
    const getCountryList = (data) => {
        return Object.values(data).flat().map(item => ({
            country: item.country,
            states: item.states
        }));
    };
    const [countryList] = useState(getCountryList(countries)); // Flattened list of countries
    const [states, setStates] = useState([]);
    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        validation.setFieldValue('country', selectedCountry);

        // Find the selected country's states
        const countryData = countryList.find(country => country.country === selectedCountry);
        setStates(countryData ? countryData.states : []); // Set states for the selected country
        validation.setFieldValue('state', ''); // Reset state field
    };
    document.title = "Profile Settings";
    const validation = useFormik({
    enableReinitialize: true, // Corrected to boolean
    initialValues: {
        licensedTo: '',
        firstname: '',
        lastname: '',
        phonenumber: mobile || '', // Ensure `mobile` is defined, else fallback to empty string
        email: '',
        gstin: gstin || '', // Ensure `gstin` is defined, else fallback to empty string
        gstinregistration: '',
        designation: '',
        addressline1: '',
        addressline2: '',
        city: '',
        state: '',
        country: '',
        zipcode: '',
        categories: Object.keys(selectedCategories), // Use category IDs or titles from `selectedCategories`
    },
    validationSchema: Yup.object({
        licensedTo: Yup.string().required('Company Name is required'),
        firstname: Yup.string().required('First Name is required'),
        lastname: Yup.string().required('Last Name is required'),
        phonenumber: Yup.string()
            .matches(/^[0-9]{10}$/, 'Phone Number must be exactly 10 digits')
            .required('Phone Number is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        gstin: Yup.string()
            .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GSTIN format')
            .required('GSTIN is required'),
        gstinregistration: Yup.string().required('GSTIN registration type required'),
        designation: Yup.string().required('Designation is required'),
        addressline1: Yup.string().required('Address Line 1 is required'),
        addressline2: Yup.string(),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        country: Yup.string().required('Country is required'),
        zipcode: Yup.string()
            .matches(/^[0-9]{5,6}$/, 'Zip Code must be 5 or 6 digits')
            .required('Zip Code is required'),
        categories: Yup.array().min(1, 'At least one category is required'),
    }),
    onSubmit: (values) => {
        dispatch(POST_Address_details(values));
    },
});

    useEffect(() => {
        if (success) {
            // Navigate based on OTP verification status

            localStorage.setItem("verifiedAddress", true);
            navigate("/dashboards-erp");
        }
    }, [success, navigate, data]);
    console.log(selectedCategories);
    console.log(data);
    console.log(success);
        return (
        <React.Fragment>
            <ParticlesAuth>
                    <div className="auth-page-content">
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
                        <Container fluid>
                            <div className="position-relative mx-n4 mt-n4">
                                <div className="profile-wid-bg profile-setting-img">
                                    <img src={progileBg} className="profile-wid-img" alt="" />
                                </div>
                            </div>
                            <Row className="justify-content-center">
                                <Col xxl={9}>
                                    <Card className="mt-xxl-n5 card-bg-fill">
                                        <CardHeader>
                                            <Nav className="nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: activeTab === "1" })}
                                                        onClick={() => tabChange("1")}>
                                                        Categories
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: activeTab === "2" })}
                                                        onClick={() => tabChange("2")}>
                                                        Personal Details
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: activeTab === "3" })}
                                                        onClick={() => tabChange("3")}>
                                                        Change Mobile
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: activeTab === "4" })}
                                                        onClick={() => tabChange("4")}>
                                                        Change Credentials
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: activeTab === "5" })}
                                                        onClick={() => tabChange("5")}>
                                                        Privacy Policy
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                        </CardHeader>
                                        <CardBody className="p-4">
                                            <TabContent activeTab={activeTab}>
                                                <TabPane tabId="1">
                                                    <UserOnboarding
                                                        selectedCategories={selectedCategories}
                                                        setSelectedCategories={setSelectedCategories}
                                                        onSave={() => {
                                                            // Save selected categories logic here
                                                            console.log("Selected Categories:", Array.from(selectedCategories));
                                                            tabChange("2");
                                                            // You could also trigger a backend API call or local storage update
                                                        }}
                                                    />
                                                </TabPane>
                                                <TabPane tabId="2">
                                                    <Form
                                                        onSubmit={(e) => {
                                                            e.preventDefault();
                                                            validation.handleSubmit();
                                                            return false;
                                                        }}
                                                    >
                                                        <Row>
                                                            <Col lg={12}>
                                                                <div className="mb-3">
                                                                    <Label htmlFor="licensedTo" className="form-label">Licensed To</Label>
                                                                    <Input
                                                                        type="text"
                                                                        name="licensedTo"
                                                                        id="licensedTo"
                                                                        className="form-control"
                                                                        placeholder="Enter your Company Name"
                                                                        onChange={validation.handleChange}
                                                                        onBlur={validation.handleBlur}
                                                                        defaultValue={validation.values.licensedTo || ""}
                                                                        invalid={validation.touched.licensedTo && validation.errors.licensedTo ? true : false}
                                                                    />
                                                                    {validation.touched.licensedTo && validation.errors.licensedTo && (
                                                                        <FormFeedback type="invalid">{validation.errors.licensedTo}</FormFeedback>
                                                                    )}
                                                                </div>
                                                            </Col>

                                                            <Col lg={6}>
                                                                <div className="mb-3">
                                                                    <Label htmlFor="firstname" className="form-label">First Name</Label>
                                                                    <Input
                                                                        type="text"
                                                                        name="firstname"
                                                                        id="firstname"
                                                                        className="form-control"
                                                                        placeholder="Enter your firstname"
                                                                        onChange={validation.handleChange}
                                                                        onBlur={validation.handleBlur}
                                                                        defaultValue={validation.values.firstname || ""}
                                                                        invalid={validation.touched.firstname && validation.errors.firstname ? true : false}
                                                                    />
                                                                    {validation.touched.firstname && validation.errors.firstname && (
                                                                        <FormFeedback type="invalid">{validation.errors.firstname}</FormFeedback>
                                                                    )}
                                                                </div>
                                                            </Col>

                                                            <Col lg={6}>
                                                                <div className="mb-3">
                                                                    <Label htmlFor="lastname" className="form-label">Last Name</Label>
                                                                    <Input
                                                                        type="text"
                                                                        name="lastname"
                                                                        id="lastname"
                                                                        className="form-control"
                                                                        placeholder="Enter your lastname"
                                                                        onChange={validation.handleChange}
                                                                        onBlur={validation.handleBlur}
                                                                        defaultValue={validation.values.lastname || ""}
                                                                        invalid={validation.touched.lastname && validation.errors.lastname ? true : false}
                                                                    />
                                                                    {validation.touched.lastname && validation.errors.lastname && (
                                                                        <FormFeedback type="invalid">{validation.errors.lastname}</FormFeedback>
                                                                    )}
                                                                </div>
                                                            </Col>

                                                            <Col lg={6}>
                                                                <div className="mb-3">
                                                                    <Label htmlFor="mobileNumber" className="form-label">Phone Number</Label>
                                                                    <Input
                                                                        type="text"
                                                                        name="mobileNumber"
                                                                        id="mobileNumber"
                                                                        className="form-control"
                                                                        placeholder="Enter your mobile number"
                                                                        onChange={validation.handleChange}
                                                                        onBlur={validation.handleBlur}
                                                                        defaultValue={validation.values.phonenumber || ""}
                                                                        invalid={validation.touched.phonenumber && validation.errors.phonenumber ? true : false}
                                                                    />
                                                                    {validation.touched.phonenumber && validation.errors.phonenumber && (
                                                                        <FormFeedback type="invalid">{validation.errors.phonenumber}</FormFeedback>
                                                                    )}
                                                                </div>
                                                            </Col>

                                                            <Col lg={6}>
                                                                <div className="mb-3">
                                                                    <Label htmlFor="email" className="form-label">Email Address</Label>
                                                                    <Input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        className="form-control"
                                                                        placeholder="Enter your email"
                                                                        onChange={validation.handleChange}
                                                                        onBlur={validation.handleBlur}
                                                                        defaultValue={validation.values.email || ""}
                                                                        invalid={validation.touched.email && validation.errors.email ? true : false}
                                                                    />
                                                                    {validation.touched.email && validation.errors.email && (
                                                                        <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                                                                    )}
                                                                </div>
                                                            </Col>

                                                            <Col lg={12}>
                                                                <div className="mb-3">
                                                                    <Label htmlFor="gstin" className="form-label">GSTIN</Label>
                                                                    <Input
                                                                        type="text"
                                                                        name="gstin"
                                                                        id="gstin"
                                                                        className="form-control"
                                                                        placeholder="Enter your GSTIN"
                                                                        onChange={validation.handleChange}
                                                                        onBlur={validation.handleBlur}

                                                                        defaultValue={validation.values.gstin || ""}
                                                                        invalid={validation.touched.gstin && validation.errors.gstin ? true : false}
                                                                    />
                                                                    {validation.touched.gstin && validation.errors.gstin && (
                                                                        <FormFeedback type="invalid">{validation.errors.gstin}</FormFeedback>
                                                                    )}
                                                                </div>
                                                            </Col>
                                                            <Col lg={12}>
                                                                <div className="mb-3">
                                                                    <Label htmlFor="gstinregistration" className="form-label">GSTIN Registration Type</Label>
                                                                    <Input
                                                                        type="select"
                                                                        name="gstinregistration"
                                                                        id="gstinregistration"
                                                                        className="form-control"
                                                                        onChange={validation.handleChange}
                                                                        onBlur={validation.handleBlur}
                                                                        value={validation.values.gstinregistration || ""}
                                                                        invalid={validation.touched.gstinregistration && validation.errors.gstinregistration ? true : false}
                                                                    >
                                                                        <option value="">Select GSTIN Registration Type</option>
                                                                        <option value="Regular">Regular</option>
                                                                        <option value="Composition">Composition</option>
                                                                        <option value="Unregistered">Unregistered</option>
                                                                    </Input>
                                                                    {validation.touched.gstinregistration && validation.errors.gstinregistration && (
                                                                        <FormFeedback type="invalid">{validation.errors.gstinregistration}</FormFeedback>
                                                                    )}
                                                                </div>
                                                            </Col>
                                                            {/* Additional fields follow the same structure as above */}
                                                            <Col lg={12}>
                                                                <div className="mb-3">
                                                                    <Label htmlFor="designation" className="form-label">Designation</Label>
                                                                    <Input
                                                                        type="text"
                                                                        name="designation"
                                                                        id="designation"
                                                                        className="form-control"
                                                                        placeholder="Enter your designation"
                                                                        onChange={validation.handleChange}
                                                                        onBlur={validation.handleBlur}
                                                                        defaultValue={validation.values.designation || ""}
                                                                        invalid={validation.touched.designation && validation.errors.designation ? true : false}
                                                                    />
                                                                    {validation.touched.designation && validation.errors.designation && (
                                                                        <FormFeedback type="invalid">{validation.errors.designation}</FormFeedback>
                                                                    )}
                                                                </div>

                                                            </Col>
                                                            <Col lg={12}>
                                                                <div className="mb-3">
                                                                    <Label htmlFor="addressline1" className="form-label">Address Line 1</Label>
                                                                    <Input
                                                                        type="text"
                                                                        name="addressline1"
                                                                        id="addressline1"
                                                                        className="form-control"
                                                                        placeholder="Address Line 1"
                                                                        onChange={validation.handleChange}
                                                                        onBlur={validation.handleBlur}
                                                                        defaultValue={validation.values.addressline1 || ""}
                                                                        invalid={validation.touched.addressline1 && validation.errors.addressline1 ? true : false}
                                                                    />
                                                                    {validation.touched.addressline1 && validation.errors.addressline1 && (
                                                                        <FormFeedback type="invalid">{validation.errors.addressline1}</FormFeedback>
                                                                    )}
                                                                </div>
                                                            </Col>
                                                            <Col lg={12}>
                                                                <div className="mb-3">
                                                                    <Label htmlFor="addressline2" className="form-label">Address Line 2</Label>
                                                                    <Input
                                                                        type="text"
                                                                        name="addressline2"
                                                                        id="addressline2"
                                                                        className="form-control"
                                                                        placeholder="Address Line 2"
                                                                        onChange={validation.handleChange}
                                                                        onBlur={validation.handleBlur}
                                                                        defaultValue={validation.values.addressline2 || ""}
                                                                        invalid={validation.touched.addressline2 && validation.errors.addressline2 ? true : false}
                                                                    />
                                                                    {validation.touched.addressline2 && validation.errors.addressline2 && (
                                                                        <FormFeedback type="invalid">{validation.errors.addressline2}</FormFeedback>
                                                                    )}
                                                                </div>
                                                            </Col>
                                                            <Col lg={3}>
                                                                <div className="mb-3">
                                                                    <Label htmlFor="city" className="form-label">City</Label>
                                                                    <Input
                                                                        type="text"
                                                                        name="city"
                                                                        id="city"
                                                                        className="form-control"
                                                                        placeholder="Enter your City"
                                                                        onChange={validation.handleChange}
                                                                        onBlur={validation.handleBlur}
                                                                        defaultValue={validation.values.city || ""}
                                                                        invalid={validation.touched.city && validation.errors.city ? true : false}
                                                                    />
                                                                    {validation.touched.city && validation.errors.city && (
                                                                        <FormFeedback type="invalid">{validation.errors.city}</FormFeedback>
                                                                    )}
                                                                </div>
                                                            </Col>
                                                            <Col lg={3}>
                                                                <div className="mb-3">
                                                                    <Label htmlFor="country" className="form-label">Country</Label>
                                                                    <Input
                                                                        type="select"
                                                                        name="country"
                                                                        id="country"
                                                                        className="form-control"
                                                                        onChange={handleCountryChange}
                                                                        onBlur={validation.handleBlur}
                                                                        value={validation.values.country || ""}
                                                                        invalid={validation.touched.country && validation.errors.country ? true : false}
                                                                    >
                                                                        <option value="">Select Country</option>
                                                                        {countryList.map((item, index) => (
                                                                            <option key={index} value={item.country}>{item.country}</option>
                                                                        ))}
                                                                    </Input>
                                                                    {validation.touched.country && validation.errors.country && (
                                                                        <FormFeedback type="invalid">{validation.errors.country}</FormFeedback>
                                                                    )}
                                                                </div>
                                                            </Col>

                                                            <Col lg={3}>
                                                                <div className="mb-3">
                                                                    <Label htmlFor="state" className="form-label">State</Label>
                                                                    <Input
                                                                        type="select"
                                                                        name="state"
                                                                        id="state"
                                                                        className="form-control"
                                                                        onChange={(e) => validation.setFieldValue('state', e.target.value)}
                                                                        onBlur={validation.handleBlur}
                                                                        value={validation.values.state || ""}
                                                                        invalid={validation.touched.state && validation.errors.state ? true : false}
                                                                        disabled={!states.length} // Disable if no states available
                                                                    >
                                                                        <option value="">Select State</option>
                                                                        {states.map((state, index) => (
                                                                            <option key={index} value={state}>{state}</option>
                                                                        ))}
                                                                    </Input>
                                                                    {validation.touched.state && validation.errors.state && (
                                                                        <FormFeedback type="invalid">{validation.errors.state}</FormFeedback>
                                                                    )}
                                                                </div>
                                                            </Col>
                                                            <Col lg={3}>
                                                                <div className="mb-3">
                                                                    <Label htmlFor="zipcode" className="form-label">ZIP code</Label>
                                                                    <Input
                                                                        type="text"
                                                                        name="zipcode"
                                                                        id="zipcode"
                                                                        className="form-control"
                                                                        placeholder="Enter your Zip code"
                                                                        onChange={validation.handleChange}
                                                                        onBlur={validation.handleBlur}
                                                                        defaultValue={validation.values.zipcode || ""}
                                                                        invalid={validation.touched.zipcode && validation.errors.zipcode ? true : false}
                                                                    />
                                                                    {validation.touched.zipcode && validation.errors.zipcode && (
                                                                        <FormFeedback type="invalid">{validation.errors.zipcode}</FormFeedback>
                                                                    )}
                                                                </div>
                                                            </Col>
                                                            <Col lg={12}>
                                                                <div className="mb-3 pb-2">
                                                                    <Label htmlFor="exampleFormControlTextarea" className="form-label">Categories</Label>
                                                                    <ul>
                                                                        {Object.values(selectedCategories).map((category, index) => (
                                                                            <li key={index}>
                                                                                <strong>Category:</strong> {category.title}
                                                                                <ul>
                                                                                    {category.features.map((feature, featureIndex) => (
                                                                                        <li key={featureIndex}>Feature: {feature}</li>
                                                                                    ))}
                                                                                </ul>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </Col>


                                                            <Col lg={12}>
                                                                <div className="hstack gap-2 justify-content-end">
                                                                    <Button type="submit" color="primary">Update</Button>
                                                                    <Button type="button" color="soft-success" onClick={validation.handleReset}>Cancel</Button>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Form>

                                                </TabPane>
                                                <TabPane tabId="3">
                                                    <Form>
                                                        <Row className="g-2">
                                                            <Col lg={4}>
                                                                <div>
                                                                    <Label htmlFor="oldusernameInput" className="form-label">Old
                                                                        Mobile Number</Label>
                                                                    <Input type="text" className="form-control"
                                                                        id="oldmobileInput"
                                                                        placeholder="Enter current Mobile Number" defaultValue={mobile} disabled="true" />
                                                                </div>
                                                            </Col>

                                                            <Col lg={4}>
                                                                <div>
                                                                    <Label htmlFor="newmobileInput" className="form-label">New
                                                                        Mobile Number</Label>
                                                                    <Input type="text" className="form-control"
                                                                        id="newmobileInput" placeholder="Enter new Mobile Number" />
                                                                </div>
                                                            </Col>





                                                            <Col lg={12}>
                                                                <div className="text-end">
                                                                    <button type="button" className="btn btn-success" onClick={() => navigate('/otp-verification')}>Change
                                                                        Mobile Number</button>
                                                                </div>
                                                            </Col>

                                                        </Row>
                                                    </Form>
                                                </TabPane>

                                                <TabPane tabId="4">
                                                    <Form>
                                                        <Row className="g-2">
                                                            <Col lg={4}>
                                                                <div>
                                                                    <Label htmlFor="oldpasswordInput" className="form-label">Old
                                                                        Password*</Label>
                                                                    <Input type="password" className="form-control"
                                                                        id="oldpasswordInput"
                                                                        placeholder="Enter current password" />
                                                                </div>
                                                            </Col>

                                                            <Col lg={4}>
                                                                <div>
                                                                    <Label htmlFor="newpasswordInput" className="form-label">New
                                                                        Password*</Label>
                                                                    <Input type="password" className="form-control"
                                                                        id="newpasswordInput" placeholder="Enter new password" />
                                                                </div>
                                                            </Col>

                                                            <Col lg={4}>
                                                                <div>
                                                                    <Label htmlFor="confirmpasswordInput" className="form-label">Confirm
                                                                        Password*</Label>
                                                                    <Input type="password" className="form-control"
                                                                        id="confirmpasswordInput"
                                                                        placeholder="Confirm password" />
                                                                </div>
                                                            </Col>

                                                            <Col lg={12}>
                                                                <div className="mb-3">
                                                                    <Link to="#"
                                                                        className="link-primary text-decoration-underline">Forgot
                                                                        Password ?</Link>
                                                                </div>
                                                            </Col>

                                                            <Col lg={12}>
                                                                <div className="text-end">
                                                                    <button type="button" className="btn btn-success">Change
                                                                        Password</button>
                                                                </div>
                                                            </Col>

                                                        </Row>

                                                    </Form>
                                                    <Form>
                                                        <Row className="g-2">
                                                            <Col lg={4}>
                                                                <div>
                                                                    <Label htmlFor="oldusernameInput" className="form-label">Old
                                                                        Username*</Label>
                                                                    <Input type="text" className="form-control"
                                                                        id="oldusernameInput"
                                                                        placeholder="Enter current Username" defaultValue={username} disabled="true" />
                                                                </div>
                                                            </Col>

                                                            <Col lg={4}>
                                                                <div>
                                                                    <Label htmlFor="newusernameInput" className="form-label">New
                                                                        Username*</Label>
                                                                    <Input type="text" className="form-control"
                                                                        id="newusernameInput" placeholder="Enter new Username" />
                                                                </div>
                                                            </Col>

                                                            <Col lg={4}>
                                                                <div>
                                                                    <Label htmlFor="confirmuserNameInput" className="form-label">Confirm
                                                                        Username*</Label>
                                                                    <Input type="text" className="form-control"
                                                                        id="confirmusernameInput"
                                                                        placeholder="Confirm Username" />
                                                                </div>
                                                            </Col>



                                                            <Col lg={12}>
                                                                <div className="text-end">
                                                                    <button type="button" className="btn btn-success">Change
                                                                        Username</button>
                                                                </div>
                                                            </Col>

                                                        </Row>
                                                    </Form>
                                                    <div className="mt-4 mb-3 border-bottom pb-2">
                                                        <div className="float-end">
                                                            <Link to="#" className="link-primary">All Logout</Link>
                                                        </div>
                                                        <h5 className="card-title">Login History</h5>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-3">
                                                        <div className="flex-shrink-0 avatar-sm">
                                                            <div className="avatar-title bg-light text-primary rounded-3 fs-18 material-shadow">
                                                                <i className="ri-smartphone-line"></i>
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <h6>iPhone 12 Pro</h6>
                                                            <p className="text-muted mb-0">Los Angeles, United States - March 16 at
                                                                2:47PM</p>
                                                        </div>
                                                        <div>
                                                            <Link to="#">Logout</Link>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-3">
                                                        <div className="flex-shrink-0 avatar-sm">
                                                            <div className="avatar-title bg-light text-primary rounded-3 fs-18 material-shadow">
                                                                <i className="ri-tablet-line"></i>
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <h6>Apple iPad Pro</h6>
                                                            <p className="text-muted mb-0">Washington, United States - November 06
                                                                at 10:43AM</p>
                                                        </div>
                                                        <div>
                                                            <Link to="#">Logout</Link>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-3">
                                                        <div className="flex-shrink-0 avatar-sm">
                                                            <div className="avatar-title bg-light text-primary rounded-3 fs-18 material-shadow">
                                                                <i className="ri-smartphone-line"></i>
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <h6>Galaxy S21 Ultra 5G</h6>
                                                            <p className="text-muted mb-0">Conneticut, United States - June 12 at
                                                                3:24PM</p>
                                                        </div>
                                                        <div>
                                                            <Link to="#">Logout</Link>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0 avatar-sm">
                                                            <div className="avatar-title bg-light text-primary rounded-3 fs-18 material-shadow">
                                                                <i className="ri-macbook-line"></i>
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <h6>Dell Inspiron 14</h6>
                                                            <p className="text-muted mb-0">Phoenix, United States - July 26 at
                                                                8:10AM</p>
                                                        </div>
                                                        <div>
                                                            <Link to="#">Logout</Link>
                                                        </div>
                                                    </div>
                                                </TabPane>

                                                <TabPane tabId="5">
                                                    <div className="mb-4 pb-2">
                                                        <h5 className="card-title text-decoration-underline mb-3">Security:</h5>
                                                        <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0">
                                                            <div className="flex-grow-1">
                                                                <h6 className="fs-14 mb-1">Two-factor Authentication</h6>
                                                                <p className="text-muted">Two-factor authentication is an enhanced
                                                                    security meansur. Once enabled, you'll be required to give
                                                                    two types of identification when you log into Google
                                                                    Authentication and SMS are Supported.</p>
                                                            </div>
                                                            <div className="flex-shrink-0 ms-sm-3">
                                                                <Link to="#"
                                                                    className="btn btn-sm btn-primary">Enable Two-facor
                                                                    Authentication</Link>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                                                            <div className="flex-grow-1">
                                                                <h6 className="fs-14 mb-1">Secondary Verification</h6>
                                                                <p className="text-muted">The first factor is a password and the
                                                                    second commonly includes a text with a code sent to your
                                                                    smartphone, or biometrics using your fingerprint, face, or
                                                                    retina.</p>
                                                            </div>
                                                            <div className="flex-shrink-0 ms-sm-3">
                                                                <Link to="#" className="btn btn-sm btn-primary">Set
                                                                    up secondary method</Link>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                                                            <div className="flex-grow-1">
                                                                <h6 className="fs-14 mb-1">Backup Codes</h6>
                                                                <p className="text-muted mb-sm-0">A backup code is automatically
                                                                    generated for you when you turn on two-factor authentication
                                                                    through your iOS or Android Twitter app. You can also
                                                                    generate a backup code on twitter.com.</p>
                                                            </div>
                                                            <div className="flex-shrink-0 ms-sm-3">
                                                                <Link to="#"
                                                                    className="btn btn-sm btn-primary">Generate backup codes</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <h5 className="card-title text-decoration-underline mb-3">Application Notifications:</h5>
                                                        <ul className="list-unstyled mb-0">
                                                            <li className="d-flex">
                                                                <div className="flex-grow-1">
                                                                    <label htmlFor="directMessage"
                                                                        className="form-check-label fs-14">Direct messages</label>
                                                                    <p className="text-muted">Messages from people you follow</p>
                                                                </div>
                                                                <div className="flex-shrink-0">
                                                                    <div className="form-check form-switch">
                                                                        <Input className="form-check-input" type="checkbox"
                                                                            role="switch" id="directMessage" defaultChecked />
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className="d-flex mt-2">
                                                                <div className="flex-grow-1">
                                                                    <Label className="form-check-label fs-14"
                                                                        htmlFor="desktopNotification">
                                                                        Show desktop notifications
                                                                    </Label>
                                                                    <p className="text-muted">Choose the option you want as your
                                                                        default setting. Block a site: Next to "Not allowed to
                                                                        send notifications," click Add.</p>
                                                                </div>
                                                                <div className="flex-shrink-0">
                                                                    <div className="form-check form-switch">
                                                                        <Input className="form-check-input" type="checkbox"
                                                                            role="switch" id="desktopNotification" defaultChecked />
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className="d-flex mt-2">
                                                                <div className="flex-grow-1">
                                                                    <Label className="form-check-label fs-14"
                                                                        htmlFor="emailNotification">
                                                                        Show email notifications
                                                                    </Label>
                                                                    <p className="text-muted"> Under Settings, choose Notifications.
                                                                        Under Select an account, choose the account to enable
                                                                        notifications for. </p>
                                                                </div>
                                                                <div className="flex-shrink-0">
                                                                    <div className="form-check form-switch">
                                                                        <Input className="form-check-input" type="checkbox"
                                                                            role="switch" id="emailNotification" />
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className="d-flex mt-2">
                                                                <div className="flex-grow-1">
                                                                    <Label className="form-check-label fs-14"
                                                                        htmlFor="chatNotification">
                                                                        Show chat notifications
                                                                    </Label>
                                                                    <p className="text-muted">To prevent duplicate mobile
                                                                        notifications from the Gmail and Chat apps, in settings,
                                                                        turn off Chat notifications.</p>
                                                                </div>
                                                                <div className="flex-shrink-0">
                                                                    <div className="form-check form-switch">
                                                                        <Input className="form-check-input" type="checkbox"
                                                                            role="switch" id="chatNotification" />
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className="d-flex mt-2">
                                                                <div className="flex-grow-1">
                                                                    <Label className="form-check-label fs-14"
                                                                        htmlFor="purchaesNotification">
                                                                        Show purchase notifications
                                                                    </Label>
                                                                    <p className="text-muted">Get real-time purchase alerts to
                                                                        protect yourself from fraudulent charges.</p>
                                                                </div>
                                                                <div className="flex-shrink-0">
                                                                    <div className="form-check form-switch">
                                                                        <Input className="form-check-input" type="checkbox"
                                                                            role="switch" id="purchaesNotification" />
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h5 className="card-title text-decoration-underline mb-3">Delete This
                                                            Account:</h5>
                                                        <p className="text-muted">Go to the Data & Privacy section of your profile
                                                            Account. Scroll to "Your data & privacy options." Delete your
                                                            Profile Account. Follow the instructions to delete your account :
                                                        </p>
                                                        <div>
                                                            <Input type="password" className="form-control" id="passwordInput"
                                                                placeholder="Enter your password" defaultValue="make@321654987"
                                                                style={{ maxWidth: "265px" }} />
                                                        </div>
                                                        <div className="hstack gap-2 mt-3">
                                                            <Link to="#" className="btn btn-soft-danger">Close &
                                                                Delete This Account</Link>
                                                            <Link to="#" className="btn btn-light">Cancel</Link>
                                                        </div>
                                                    </div>
                                                </TabPane>
                                            </TabContent>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
            </ParticlesAuth>
            
        </React.Fragment>
    );
};

export default Settings;
