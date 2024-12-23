import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Card, CardBody, Col, Container, Row, Form, Label, Input, FormFeedback, Spinner } from 'reactstrap';
import ParticlesAuth from '../AuthenticationInner/ParticlesAuth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { POST_Vendor_ChangePassword } from '../../../slices/thunks';

const ChangePassword = () => {
    const dispatch = useDispatch();

    // Fetching the state from Redux
    const data = useSelector((state) => state.ChangePassword.data);
    const loading = useSelector((state) => state.ChangePassword.loading);
    const error = useSelector((state) => state.ChangePassword.error);
    const success = useSelector((state) => state.ChangePassword.success);

    // State to handle form submission feedback
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    // Title for the page
    document.title = "Change Password?";

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string().required("Please Enter Your Old Password"),
            newPassword: Yup.string().min(6, "Password must be at least 6 characters").required("Please enter your new password"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], "Passwords must match")
                .required("Please confirm your new password"),
        }),
        onSubmit: (values) => {
            dispatch(POST_Vendor_ChangePassword({
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
            }));
        }
    });

    // Show success or error message based on the response
    useEffect(() => {
        if (success) {
            setFeedbackMessage({
                type: 'success',
                message: 'Password has been successfully changed .',
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
                                        <h5 className="text-primary">Change Password</h5>
                                        <p className="text-muted">Update your Password securely</p>

                                        <lord-icon
                                            src="https://cdn.lordicon.com/rhvddzym.json"
                                            trigger="loop"
                                            colors="primary:#0ab39c"
                                            className="avatar-xl"
                                            style={{ width: "120px", height: "120px" }}>
                                        </lord-icon>
                                    </div>

                                    {/* Feedback alert for success or error */}
                                    {feedbackMessage && (
                                        <Alert color={feedbackMessage.type} className="text-center">
                                            {feedbackMessage.message}
                                        </Alert>
                                    )}

                                    <div className="p-2">
                                        <Form onSubmit={validation.handleSubmit}>
                                            <div className="mb-4">
                                                <Label className="form-label">Old Password</Label>
                                                <Input
                                                    type="password"
                                                    className="form-control"
                                                    id="oldPassword"
                                                    placeholder="Enter Old Password"
                                                    name="oldPassword"
                                                    value={validation.values.oldPassword}
                                                    onBlur={validation.handleBlur}
                                                    onChange={validation.handleChange}
                                                    invalid={validation.errors.oldPassword && validation.touched.oldPassword ? true : false}
                                                />
                                                {validation.errors.oldPassword && validation.touched.oldPassword ? (
                                                    <FormFeedback type="invalid">{validation.errors.oldPassword}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-4">
                                                <Label className="form-label">New Password</Label>
                                                <Input
                                                    type="password"
                                                    className="form-control"
                                                    id="newPassword"
                                                    placeholder="Enter new password"
                                                    name="newPassword"
                                                    value={validation.values.newPassword}
                                                    onBlur={validation.handleBlur}
                                                    onChange={validation.handleChange}
                                                    invalid={validation.errors.newPassword && validation.touched.newPassword ? true : false}
                                                />
                                                {validation.errors.newPassword && validation.touched.newPassword ? (
                                                    <FormFeedback type="invalid">{validation.errors.newPassword}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-4">
                                                <Label className="form-label">Confirm New Password</Label>
                                                <Input
                                                    type="password"
                                                    className="form-control"
                                                    id="confirmPassword"
                                                    placeholder="Confirm new password"
                                                    name="confirmPassword"
                                                    value={validation.values.confirmPassword}
                                                    onBlur={validation.handleBlur}
                                                    onChange={validation.handleChange}
                                                    invalid={validation.errors.confirmPassword && validation.touched.confirmPassword ? true : false}
                                                />
                                                {validation.errors.confirmPassword && validation.touched.confirmPassword ? (
                                                    <FormFeedback type="invalid">{validation.errors.confirmPassword}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="text-center mt-4">
                                                {/* Display spinner if loading */}
                                                {loading ? (
                                                    <Spinner color="primary" />
                                                ) : (
                                                    <button className="btn btn-success w-100" type="submit">Change Password</button>
                                                )}
                                            </div>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>

                            <div className="mt-4 text-center">
                                <p className="mb-0">Go back to <Link to="/Login" className="fw-bold text-primary text-decoration-underline"> Login </Link> </p>
                            </div>

                        </Col>
                    </Row>
                </Container>
            </div>
        </ParticlesAuth>
    );
};

export default ChangePassword;