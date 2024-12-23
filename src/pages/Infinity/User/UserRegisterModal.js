import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormFeedback ,Alert,Spinner} from 'reactstrap';
import { POST_USER_Register } from './../../../slices/Infinity/User/Register/thunk'; // Ensure this path is correct

const UserRegisterModal = ({ isOpen, toggle }) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.UserRegister.data);
    const loading = useSelector((state) => state.UserRegister.loading);
    const success = useSelector((state) => state.UserRegister.success);
    const error= useSelector((state)=>state.UserRegister.error);
    // Form validation schema
    const [showPassword,setShowPassword]=useState(false);
    const validate = values => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email address is invalid';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        if (!values.name) {
            errors.name = 'Name is required';
        }
        if(!values.userRole){
            errors.userRole = 'userRole is required';
        }
        if (!values.mobile) {
            errors.mobile = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(values.mobile)) {
            errors.mobile = 'Mobile number must be 10 digits';
        }
        return errors;
    };
    // console.log(data);
    // console.log(error);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            name: '',
            mobile: '',
            userRole:'',
            isActive: true, // Add initial value for isActive
        },
        validate,
        onSubmit: async (values) => {
            try {
                await dispatch(POST_USER_Register(values)).unwrap(); // Wait for the action to complete

                // Clear the form data and close the modal on success
                formik.resetForm({
                    values: {
                        email: '',
                        password: '',
                        name: '',
                        mobile: '',
                        userRole:'',
                        isActive: true, // Reset isActive to default
                    },
                });
                toggle(); // Close the modal
            } catch (error) {
                // Handle errors (e.g., reset form if needed or display error messages)
                console.error('Registration failed:', error);
                formik.resetForm({
                    values: {
                        email: '',
                        password: '',
                        name: '',
                        mobile: '',
                        userRole:'',
                        isActive: true, // Reset isActive to default
                    },
                }); // Optional: reset fields even on error if required
            }
        },
});

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>User Registration</ModalHeader>
            <ModalBody>
                {success && <Alert color="success">"success"</Alert>}
                {error && <Alert color="danger"> {error} </Alert>}
                {loading && <Spinner color="primary" />}
                <Form onSubmit={formik.handleSubmit}>
                    {/* Name Field */}
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="bx bx-user" style={{ fontSize: "1.5em" }}></i>
                                </span>
                            </div>
                            <Input
                                type="text"
                                className={`form-control ${formik.touched.name && formik.errors.name ? "is-invalid" : ""}`}
                                name="name"
                                id="name"
                                placeholder="Enter your name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.name && formik.errors.name && (
                            <FormFeedback>{formik.errors.name}</FormFeedback>
                        )}
                    </FormGroup>

                    {/* Mobile Field */}
                    <div className="mb-3">
                        <label htmlFor="mobile" className="form-label">
                            WhatsApp Mobile Number <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="bx bxl-whatsapp" style={{ fontSize: "1.5em", color: "#25D366" }}></i>
                                </span>
                            </div>
                            <input
                                type="text"
                                className={`form-control ${formik.touched.mobile && formik.errors.mobile ? "is-invalid" : ""}`}
                                id="mobile"
                                placeholder="Enter mobile number"
                                name="mobile"
                                value={formik.values.mobile}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                            />
                        </div>
                        {formik.touched.mobile && formik.errors.mobile && (
                            <div className="invalid-feedback">{formik.errors.mobile}</div>
                        )}
                        <small className="form-text text-muted">Automated updates will be sent to this number.</small>
                    </div>

                    {/* Email Field */}
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="bx bx-envelope" style={{ fontSize: "1.5em" }}></i>
                                </span>
                            </div>
                            <Input
                                type="email"
                                className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.email && formik.errors.email && (
                            <FormFeedback>{formik.errors.email}</FormFeedback>
                        )}
                        <small className="form-text text-muted">Automated updates will be sent to this email.</small>
                    </FormGroup>
                    {/* userRole*/}
                    <FormGroup>
                        <Label for="userRole">Role</Label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="bx bx-user" style={{ fontSize: "1.5em" }}></i>
                                </span>
                            </div>
                            <Input
                                type="select"
                                className={`form-control ${formik.touched.userRole && formik.errors.userRole ? "is-invalid" : ""}`}
                                name="userRole"
                                id="userRole"
                                value={formik.values.userRole}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">Select a Role</option>
                                <option value="Manager">Manager</option>
                                <option value="User">User</option>
                            </Input>
                        </div>
                        {formik.touched.userRole && formik.errors.userRole && (
                            <FormFeedback>{formik.errors.userRole}</FormFeedback>
                        )}
                        <small className="form-text text-muted">Please select your Role.</small>
                    </FormGroup>

                    {/* Password Field */}
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="bx bx-lock" style={{ fontSize: "1.5em" }}></i>
                                </span>
                            </div>
                            <Input
                                type={showPassword ? "text" : "password"} // Toggle input type between text and password
                                className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <div className="input-group-append">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                                >
                                    {showPassword ? (
                                        <i className="las la-eye-slash" style={{ fontSize: "1.5em" }}></i>
                                    ) : (
                                            <i className="las la-eye" style={{ fontSize: "1.5em" }}></i>
                                    )}
                                </button>
                            </div>
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <FormFeedback>{formik.errors.password}</FormFeedback>
                        )}
                    </FormGroup>

                    {/* Active Status Checkbox */}
                    <FormGroup check>
                        <Input
                            type="checkbox"
                            id="isActive"
                            name="isActive"
                            checked={formik.values.isActive}
                            onChange={formik.handleChange}
                        />
                        <Label for="isActive" check>
                            Active Status
                        </Label>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={formik.handleSubmit} disabled={formik.isSubmitting}>
                    Register
                </Button>
                <Button color="secondary" onClick={toggle}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );

};

export default UserRegisterModal;
