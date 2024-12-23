import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Card, CardBody, Col, Container, Row, Form, Label, Input, FormFeedback, Spinner } from 'reactstrap';
import ParticlesAuth from '../AuthenticationInner/ParticlesAuth';
import logoLight from "../../../assets/images/logo-light.png";
import { POST_Vendor_ForgotPassword } from '../../../slices/ERPLogin/auth/ForgotPassword/thunk';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

const ForgetPassword = () => {
    const dispatch = useDispatch();

    // Fetching the state from Redux
    const data = useSelector((state) => state.ForgotPassword.data);
    const loading = useSelector((state) => state.ForgotPassword.loading);
    const error = useSelector((state) => state.ForgotPassword.error);
    const success = useSelector((state) => state.ForgotPassword.success);

    // State to handle form submission feedback
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    // Title for the page
    // document.title = "Reset Password | Velzon - React Admin & Dashboard Template";

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Please Enter Your Email/GSTIN/Mobile Number"),
        }),
        onSubmit: (values) => {
            dispatch(POST_Vendor_ForgotPassword(values.username));
        }
    });

    // Show success or error message based on the response
    useEffect(() => {
        if (success) {
            setFeedbackMessage({
                type: 'success',
                message: 'Password reset link has been sent to your email or registered mobile number.',
            });
        } else if (error) {
            setFeedbackMessage({
                type: 'danger',
                message: error || 'Something went wrong. Please try again.',
            });
        }
    }, [success, error]);

    return (
        <ParticlesAuth>
            <div className="auth-page-content mt-lg-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="mt-4 card-bg-fill">
                                <CardBody className="p-4">
                                    <div className="text-center mt-2">
                                        <h5 className="text-primary">Forgot Password?</h5>
                                        <p className="text-muted">Reset password </p>

                                        <lord-icon
                                            src="https://cdn.lordicon.com/rhvddzym.json"
                                            trigger="loop"
                                            colors="primary:#0ab39c"
                                            className="avatar-xl"
                                            style={{ width: "120px", height: "120px" }}>
                                        </lord-icon>
                                    </div>

                                    <Alert className="border-0 alert-warning text-center mb-2 mx-2" role="alert">
                                        Enter your email / GSTIN / Registered Whatsapp Number and instructions will be sent to you!
                                    </Alert>

                                    {/* Feedback alert for success or error */}
                                    {feedbackMessage && (
                                        <Alert color={feedbackMessage.type} className="text-center">
                                            {feedbackMessage.message}
                                        </Alert>
                                    )}

                                    <div className="p-2">
                                        <Form onSubmit={validation.handleSubmit}>
                                            <div className="mb-4">
                                                <Label className="form-label">Email/GSTIN/Registered Mobile Number</Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="email"
                                                    placeholder="Enter email/GSTIN/Whatsapp Number"
                                                    name="username"
                                                    value={validation.values.username}
                                                    onBlur={validation.handleBlur}
                                                    onChange={validation.handleChange}
                                                    invalid={validation.errors.username && validation.touched.username ? true : false}
                                                />
                                                {validation.errors.username && validation.touched.username ? (
                                                    <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="text-center mt-4">
                                                {/* Display spinner if loading */}
                                                {loading ? (
                                                    <Spinner color="primary" />
                                                ) : (
                                                    <button className="btn btn-success w-100" type="submit">Send Reset Link</button>
                                                )}
                                            </div>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>

                            <div className="mt-4 text-center">
                                <p className="mb-0">Wait, I remember my password... <Link to="/Login" className="fw-bold text-primary text-decoration-underline"> Click here </Link> </p>
                            </div>

                        </Col>
                    </Row>
                </Container>
            </div>
        </ParticlesAuth>
    );
};

export default ForgetPassword;
