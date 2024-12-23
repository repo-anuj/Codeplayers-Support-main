import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert,Card, CardBody, Col, Container, Row, Button,Input } from 'reactstrap';
import ParticlesAuth from '../Register/AuthenticationInner/ParticlesAuth';
import { useDispatch,useSelector } from 'react-redux';
import {
    POST_OTP_Verified,
    POST_OTP_Sending,
} from "../../slices/OTPVerification/thunk"; 

// Import images
// import logoLight from "../../../assets/images/logo-light.png";

const OtpVerification = () => {
    const [otp, setOtp] = useState({ digit1: '', digit2: '', digit3: '', digit4: '' });
    const [generatedOtp, setGeneratedOtp] = useState(""); // OTP will be generated here
    const [MobileNumber,setMobileNumber] = useState(localStorage.getItem("mobileNumber")||""); // Static phone number, replace with dynamic data if needed
    const [otpSent, setOtpSent] = useState(false);
    const [resendDisabled, setResendDisabled] = useState(true);
    const [timer, setTimer] = useState(30); // 30 seconds timer for resend OTP
    const [otpVerified, setOtpVerified] = useState(false);
    const dispatch=useDispatch();
    const userName=localStorage.getItem("userName");
    const navigate = useNavigate(); // Initialize useNavigate for routing
    const currentOtp=otp.digit1+otp.digit2+otp.digit3+otp.digit4;

    const OTPSentdata = useSelector((state) => state.OTPVerification.data);
    const OTPSentloading = useSelector((state) => state.OTPVerification.loading);
    const OTPSenterror = useSelector((state) => state.OTPVerification.error);
    const OTPSentsuccess = useSelector((state) => state.OTPVerification.success);

    const OTPVerifieddata=useSelector((state)=>state.OTPVerified.data);
    const OTPVerifiedloading = useSelector((state) => state.OTPVerified.loading);
    const OTPVerifiederror = useSelector((state) => state.OTPVerified.error);
    const OTPVerifiedsuccess = useSelector((state) => state.OTPVerified.success);
    // Generate a random 4-digit OTP
    // Generate a random 4-digit OTP and send the OTP and mobile number via POST request
    useEffect(() => {
        if (OTPSentsuccess) {
            setOtpSent(true);
            setResendDisabled(true);
            setTimer(30);
        }
        // OTP sent successfully
        // Reset the resend timer

        else {
            // Handle error if OTP sending fails
            console.error("Error sending OTP:", OTPSenterror);
            // Optionally, you can set this to false
            setOtpSent(false);
        };
    }, [OTPSentsuccess,OTPSenterror]);
    useEffect(() => {
        if (OTPVerifiedsuccess) {
            
            navigate('/Dashboards-ERP');
        }
        else {

            console.error("OTP VERIFICATION FAILED", OTPVerifiederror);

            // setOtpSent(false);
        }

    }, [OTPVerifiedsuccess,OTPVerifiederror]);
    const generateOtp = () => {
        

        // Prepare the payload with mobile number and generated OTP
        const payload = {
            mobileNumber: MobileNumber,
            userName:userName,
        };

        // Dispatch the action with the payload
        // console.log(payload)
        dispatch(POST_OTP_Sending(payload))
            
    };


    // Move focus to the next input field
    const getInputElement = (index) => document.getElementById('digit' + index + '-input');

    const moveToNext = (index) => {
        if (getInputElement(index).value.length === 1 && index !== 4) {
            getInputElement(index + 1).focus();
        } else if (index === 4) {
            getInputElement(index).blur();
        }
    };

    const handleInputChange = (e, index) => {
        setOtp({ ...otp, [`digit${index}`]: e.target.value });
        moveToNext(index);
    };

    // Verify OTP
    const verifyOtp = () => {
        
            const payload={mobileNumber:MobileNumber,userName:userName,otp:currentOtp};
            dispatch(POST_OTP_Verified(payload))
                

    };

    // Resend OTP handler
    const resendOtp = () => {
        generateOtp(); // Regenerate and "resend" OTP
    };

    // Start the resend timer when OTP is sent
    useEffect(() => {
        let interval;
        if (otpSent && resendDisabled) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setResendDisabled(false); // Enable resend button after timer ends
                        return 30;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [otpSent, resendDisabled]);

    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className="auth-page-wrapper">
                    <div className="auth-page-content mt-lg-5">
                        <Container>
                            <Row className="justify-content-center">
                                <Col md={8} lg={6} xl={5}>
                                    <Card className="mt-4 card-bg-fill">
                                        <CardBody className="p-4">
                                            {OTPSenterror && <Alert 
                                            color="danger"> {OTPSenterror} </Alert>}
                                            {OTPVerifiederror && <Alert color="danger"> {OTPVerifiederror} </Alert>}

                                            <div className="mb-4">
                                                {otpSent ? (
                                                    <div className="avatar-lg mx-auto">
                                                        <div className="avatar-title bg-light text-primary display-5 rounded-circle">
                                                            <i className="ri-mail-line"></i>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-center mt-2">
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/rhvddzym.json"
                                                            trigger="loop"
                                                            colors="primary:#0ab39c"
                                                            className="avatar-xl"
                                                            style={{ width: "120px", height: "120px" }}
                                                        ></lord-icon>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-2 mt-4">
                                                <div className="text-muted text-center mb-4 mx-lg-3">
                                                    <h4>Verify Your Whatsapp Number</h4>
                                                    <p>Please enter the 4-digit OTP sent on Whatsapp to</p>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                                <i className="bx bxl-whatsapp" style={{ fontSize: "1.5em", paddingRight: "5px", color: "#25D366" }}></i>
                                                            </span>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            className="form-control text-center text-muted"
                                                            id="mobileNumber"
                                                            defaultValue={MobileNumber}
                                                            readOnly={otpSent} // Set to true when otpSent is true
                                                        />
                                                    </div>
                                                    
                                                </div>

                                                {/* Back Button in Top Left Corner */}
                                                {otpSent && (
                                                    <div className="back-button-container" style={{ position: 'absolute', top: '20px', left: '20px' }}>
                                                        <Button
                                                            color="transparent" // Making the button background transparent
                                                            style={{
                                                                border: 'none',  // Removing the border
                                                                padding: '5px',  // Reducing the padding for a smaller size
                                                                fontSize: '20px',  // Adjusting the size of the icon
                                                                opacity: '1'  // Full opacity
                                                            }}
                                                            onClick={() => setOtpSent(false)} // Back button click handler
                                                        >
                                                            <i className="bx bx-left-arrow-alt"></i>
                                                        </Button>
                                                    </div>
                                                )}

                                                {/* Loading Spinner for Sending OTP */}
                                                {OTPSentloading && (
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
                                                            <p className="validating-message">Sending OTP...</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Loading Spinner for Verifying OTP */}
                                                {OTPVerifiedloading && (
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
                                                            <p className="validating-message">Verifying OTP...</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {otpSent && !OTPSentloading ? (
                                                    <>
                                                        <form>
                                                            <Row>
                                                                {[1, 2, 3, 4].map((index) => (
                                                                    <Col key={index} className="col-3">
                                                                        <div className="mb-3">
                                                                            <label
                                                                                htmlFor={`digit${index}-input`}
                                                                                className="visually-hidden"
                                                                            >
                                                                                Digit {index}
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control form-control-lg bg-light border-light text-center"
                                                                                maxLength="1"
                                                                                id={`digit${index}-input`}
                                                                                value={otp[`digit${index}`]}
                                                                                onChange={(e) => handleInputChange(e, index)}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                ))}
                                                            </Row>
                                                        </form>

                                                        <div className="mt-3">
                                                            <Button color="success" className="w-100" onClick={verifyOtp}>
                                                                Confirm
                                                            </Button>
                                                        </div>

                                                        <div className="mt-3 text-center">
                                                            <Button
                                                                color="warning"
                                                                onClick={resendOtp}
                                                                disabled={resendDisabled}
                                                            >
                                                                {resendDisabled ? `Resend OTP in ${timer}s` : "Resend OTP"}
                                                            </Button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="text-center">
                                                        <Button color="primary" onClick={generateOtp}>
                                                            Send OTP
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>

                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>

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

export default OtpVerification;
