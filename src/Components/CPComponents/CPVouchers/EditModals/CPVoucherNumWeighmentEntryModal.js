import React, { useState, useEffect } from "react";
import {
  Button,
  Label,
  Row,
  Col,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const CPVoucherNumWeighmentEntryModal = ({
  voucher,
  onUpdate,
  isOpen,
  toggleOpen,
}) => {
  const handleSubmit = (values) => {
    onUpdate(values);
  };
  const dispatch = useDispatch();
  const data = useSelector((state) => state.WeighBridgeData.data);
  const cameraData = useSelector((state) => state.WeighBridgeData.cameraData);
  const [isPaused, setIsPaused] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [stationLabel, setStationLabel] = useState("Not Configured");
  const [intervalId, setIntervalId] = useState(null);
  const [displayData, setDisplayData] = useState("NC");
  const [fetchingImages, setFetchingImages] = useState(false);
  const [isWeighBridge, setIsWeighBridge] = useState(false);
  const [isCameraCapture, setIsCameraCapture] = useState(false);

  const integrationDataList = useSelector(
    (state) => state.WeighBridgeData.integrationData
  );

  const loading = useSelector((state) => state.WeighBridgeData.loading);

  function isWeighBridgeAvailable(integrationDataList) {
    if (integrationDataList === null || integrationDataList === undefined)
      return false;
    const weighBridgeCount = integrationDataList.filter(
      (item) => item.TaskType === 0
    ).length;
    return weighBridgeCount > 0;
  }

  function isCameraCaptureAvailable(integrationDataList) {
    if (integrationDataList === null || integrationDataList === undefined)
      return false;
    const cameraCaptureCount = integrationDataList.filter(
      (item) => item.TaskType === 1
    ).length;
    return cameraCaptureCount > 0;
  }

  useEffect(() => {
    setIsWeighBridge(isWeighBridgeAvailable(integrationDataList));
    setIsCameraCapture(isCameraCaptureAvailable(integrationDataList));
  }, [integrationDataList]);

  console.log(integrationDataList);

  useEffect(() => {
    const savedState = localStorage.getItem("isPaused") === "false";
    const savedIntervalId = localStorage.getItem("intervalId");
    const savedStationLabel = localStorage.getItem("stationLabel");

    setIsPaused(!savedState);
    setStationLabel(savedStationLabel || "Not Configured");

    if (savedState && savedIntervalId) {
      setIntervalId(parseInt(savedIntervalId, 10));
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("isPaused", isPaused);
    if (isPaused) {
      if (intervalId) {
        clearInterval(intervalId);
        localStorage.removeItem("intervalId");
        setIntervalId(null);
      }
    } else {
      if (intervalId) {
        localStorage.setItem("intervalId", intervalId);
      }
    }
    localStorage.setItem("stationLabel", stationLabel);
  }, [isPaused, intervalId, stationLabel]);

  useEffect(() => {
    if (isPaused && stationLabel != "Not Configured") setDisplayData("0");
    else if (!isPaused) {
      setDisplayData(data);
    }
  }, [data, isPaused, stationLabel]);

  const fetchData = useCallback(() => {
    const ip = localStorage.getItem("stationIP");
    const port = localStorage.getItem("stationPort");

    if (ip && port && !loading) {
      setFetchingImages(true); // Start loader
      const url = `http://${ip}:${port}`;

      dispatch(
        POST_CAMERA_DATA({ dataIP: url, sendData: "Front,Top,Back" })
      ).finally(() => setFetchingImages(false)); // Stop loader after fetch
    }
  }, [dispatch, loading]);

  const handleFetchIntegrationData = () => {
    const ip = localStorage.getItem("stationIP");
    const port = localStorage.getItem("stationPort");
    const url = `http://${ip}:${port}`;
    dispatch(
      POST_INTEGRATIONLIST_DATA({ dataIP: url, sendData: "IntegrationList" })
    );
  };

  const handlePlay = useCallback(() => {
    if (stationLabel === "Not Configured") {
      alert("Please configure the station first.");
      return;
    }
    setIsPaused(false);
    handleFetchIntegrationData();

    if (integrationDataList && integrationDataList.length > 0) {
      const taskType0Count = integrationDataList.filter(
        (task) => task.TaskType === 0
      ).length;
      const taskType1Count = integrationDataList.filter(
        (task) => task.TaskType === 1
      ).length;
      const updatedLabel = `${localStorage.getItem(
        "stationIP"
      )}:${localStorage.getItem(
        "stationPort"
      )} | ${taskType0Count} WB, ${taskType1Count} Cameras Connected`;
      if (taskType0Count > 0 && taskType1Count > 0) {
        localStorage.setItem("stationLabel", updatedLabel);
      }
      setStationLabel(updatedLabel);
    } else {
      const updatedLabel = `${localStorage.getItem(
        "stationIP"
      )}:${localStorage.getItem("stationPort")} | Stopped`;
      setStationLabel(updatedLabel);
    }

    const id = setInterval(() => {
      const ip = localStorage.getItem("stationIP");
      const port = localStorage.getItem("stationPort");
      if (ip && port && !loading) {
        const url = `http://${ip}:${port}`;
        dispatch(POST_WEIGHBRIDGE_DATA({ dataIP: url, sendData: "WB 1" }));
      }
    }, 1000);

    setIntervalId(id);
  }, [
    stationLabel,
    dispatch,
    loading,
    handleFetchIntegrationData,
    integrationDataList,
  ]);

  const handlePause = useCallback(() => {
    setIsPaused(true);
    setDisplayData(0);

    const updatedLabel = `${localStorage.getItem(
      "stationIP"
    )}:${localStorage.getItem("stationPort")} | Stopped`;
    setStationLabel(updatedLabel);
    if (intervalId) {
      clearInterval(intervalId);
      localStorage.removeItem("intervalId");
      setIntervalId(null);
    }
  }, [intervalId]);

  const toggleModal = useCallback(() => {
    setModalOpen((prevState) => !prevState);
  }, []);

  const handleModalSave = useCallback(
    (values, resetForm) => {
      const updatedLabel = `${values.StationIP}:${values.StationPort} | Stopped `;
      localStorage.setItem("stationIP", values.StationIP);
      localStorage.setItem("stationPort", values.StationPort);
      setStationLabel(updatedLabel);
      resetForm();
      toggleModal();
    },
    [toggleModal]
  );

  const initialValues = {
    grossWeight: "",
    tareWeight: "",
    netWeight: "",
    netTime: "", // New field added
    reVerify: "",
    challanWeight: "",
    diff: "",
    grossWeightDate: "",
    tareWeightDate: "",
  };

  const validationSchema = Yup.object({
    grossWeight: Yup.number()
      .required("Gross Weight is required")
      .typeError("Gross Weight must be a number")
      .min(0, "Gross Weight must be greater than 0"),

    tareWeight: Yup.number()
      .required("Tare Weight is required")
      .typeError("Tare Weight must be a number")
      .min(0, "Gross Weight must be greater than 0"),

    netWeight: Yup.number()
      .required("Net Weight is required")
      .typeError("Net Weight must be a number")
      .min(0, "Gross Weight must be greater than 0"),

    netTime: Yup.string().required("Net Time is required"), // New validation
    reVerify: Yup.number()
      .required("Re Verify is required")
      .typeError("Re Verify must be a number"),
    challanWeight: Yup.number()
      .required("Challan Weight is required")
      .typeError("Challan Weight must be a number"),
    diff: Yup.number()
      .required("Diff is required")
      .typeError("Diff must be a number"),
    grossWeightDate: Yup.date().required("Gross Weight Date is required"),
    tareWeightDate: Yup.date().required("Tare Weight Date is required"),
  });

  return (
    <Modal
      isOpen={modalWeighmentDetails}
      toggle={toggleModalWeighmentDetails}
      style={{ maxWidth: "400px", width: "100%" }} // Inline modal styles
    >
      <ModalHeader toggle={toggleModalWeighmentDetails}>
        Weighment Details
      </ModalHeader>
      <ModalBody style={{ padding: "10px" }}>
        {" "}
        {/* Reduced padding */}
        <div className="p-2">
          <Formik
            onSubmit={(values, { resetForm }) => {
              handleModalSave(values, resetForm);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="d-flex align-items-center mb-3">
                  {stationLabel !== "Not Configured" && (
                    <Button
                      color="info"
                      onClick={isPaused ? handlePlay : handlePause}
                      className="btn-sm me-2"
                      aria-label={isPaused ? "Start" : "Pause"}
                    >
                      {isPaused ? <FaPlay /> : <FaPause />}
                    </Button>
                  )}
                  <label htmlFor="station" className="me-2 mb-0">
                    Station:
                  </label>
                  <span
                    id="station"
                    className="fw-bold cursor-pointer"
                    onClick={toggleModal}
                    aria-label="Station Information"
                  >
                    {stationLabel}
                  </span>
                </div>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values, { resetForm }) => {
                    console.log("Form values", values);
                    // Process the form submission logic here
                    resetForm(); // After processing, reset the form
                  }}
                >
                  {({ errors, touched, submitForm }) => (
                    <>
                      {/* Gross Weight and Date Fields */}
                      <div className="mb-2 row">
                        <div className="col-6">
                          <div className="input-group">
                            G &nbsp;
                            <Field
                              name="grossWeight"
                              className={`form-control form-control-sm ${
                                touched.grossWeight && errors.grossWeight
                                  ? "is-invalid"
                                  : ""
                              }`}
                              style={{ height: "30px", fontSize: "12px" }}
                            />
                            <span
                              className="input-group-text"
                              style={{
                                height: "30px",
                                lineHeight: "30px",
                                fontSize: "12px",
                              }}
                            >
                              KGS
                            </span>
                          </div>
                          {errors.grossWeight && touched.grossWeight && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.grossWeight}
                            </div>
                          )}
                        </div>
                        <div className="col-6 position-relative">
                          <Field name="grossWeightDate">
                            {({ field, form }) => (
                              <div className="position-relative">
                                <Flatpickr
                                  className={`form-control form-control-sm ${
                                    touched.grossWeightDate &&
                                    errors.grossWeightDate
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  value={field.value}
                                  onChange={(date) =>
                                    form.setFieldValue("grossWeightDate", date)
                                  }
                                  style={{ height: "30px", fontSize: "12px" }}
                                />
                                <i
                                  className="ri-calendar-2-line position-absolute"
                                  style={{
                                    right: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    pointerEvents: "none",
                                  }}
                                ></i>
                              </div>
                            )}
                          </Field>
                          {errors.grossWeightDate &&
                            touched.grossWeightDate && (
                              <div style={{ color: "red", fontSize: "12px" }}>
                                {errors.grossWeightDate}
                              </div>
                            )}
                        </div>
                      </div>

                      {/* Tare Weight and Date Fields */}
                      <div className="mb-2 row">
                        <div className="col-6">
                          <div className="input-group">
                            T &nbsp;
                            <Field
                              name="tareWeight"
                              className={`form-control form-control-sm ${
                                touched.tareWeight && errors.tareWeight
                                  ? "is-invalid"
                                  : ""
                              }`}
                              style={{ height: "30px", fontSize: "12px" }}
                            />
                            <span
                              className="input-group-text"
                              style={{
                                height: "30px",
                                lineHeight: "30px",
                                fontSize: "12px",
                              }}
                            >
                              KGS
                            </span>
                          </div>
                          {errors.tareWeight && touched.tareWeight && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.tareWeight}
                            </div>
                          )}
                        </div>
                        <div className="col-6 position-relative">
                          <Field name="tareWeightDate">
                            {({ field, form }) => (
                              <div className="position-relative">
                                <Flatpickr
                                  className={`form-control form-control-sm ${
                                    touched.tareWeightDate &&
                                    errors.tareWeightDate
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  value={field.value}
                                  onChange={(date) =>
                                    form.setFieldValue("tareWeightDate", date)
                                  }
                                  style={{ height: "30px", fontSize: "12px" }}
                                />
                                <i
                                  className="ri-calendar-2-line position-absolute"
                                  style={{
                                    right: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    pointerEvents: "none",
                                  }}
                                ></i>
                              </div>
                            )}
                          </Field>
                          {errors.tareWeightDate && touched.tareWeightDate && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.tareWeightDate}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Net Weight and Net Time Fields */}
                      <div className="mb-2 row">
                        <div className="col-6">
                          <div className="input-group">
                            N &nbsp;
                            <Field
                              name="netWeight"
                              className={`form-control form-control-sm ${
                                touched.netWeight && errors.netWeight
                                  ? "is-invalid"
                                  : ""
                              }`}
                              style={{ height: "30px", fontSize: "12px" }}
                            />
                            <span
                              className="input-group-text"
                              style={{
                                height: "30px",
                                lineHeight: "30px",
                                fontSize: "12px",
                              }}
                            >
                              KGS
                            </span>
                          </div>
                          {errors.netWeight && touched.netWeight && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.netWeight}
                            </div>
                          )}
                        </div>
                        <div className="col-6">
                          <Field
                            name="netTime"
                            className={`form-control form-control-sm ${
                              touched.netTime && errors.netTime
                                ? "is-invalid"
                                : ""
                            }`}
                            style={{ height: "30px", fontSize: "12px" }}
                          />
                          {errors.netTime && touched.netTime && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.netTime}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Re Verify Field */}
                      <Row className="mb-3">
                        <Col>
                          <label className="form-label">Re Verify:</label>
                          <div className="input-group">
                            <Field
                              name="reVerify"
                              className={`form-control form-control-sm ${
                                touched.reVerify && errors.reVerify
                                  ? "is-invalid"
                                  : ""
                              }`}
                              style={{ height: "30px", fontSize: "12px" }}
                            />
                            <span
                              className="input-group-text"
                              style={{
                                height: "30px",
                                lineHeight: "30px",
                                fontSize: "12px",
                                padding: "0 5px",
                              }}
                            >
                              KGS
                            </span>
                          </div>
                          {errors.reVerify && touched.reVerify && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.reVerify}
                            </div>
                          )}
                        </Col>
                        <Col>
                          <label className="form-label">Challan Wt:</label>
                          <div className="input-group">
                            <Field
                              name="challanWeight"
                              className={`form-control form-control-sm ${
                                touched.challanWeight && errors.challanWeight
                                  ? "is-invalid"
                                  : ""
                              }`}
                              style={{ height: "30px", fontSize: "12px" }}
                            />
                            <span
                              className="input-group-text"
                              style={{
                                height: "30px",
                                lineHeight: "30px",
                                fontSize: "12px",
                                padding: "0 5px",
                              }}
                            >
                              KGS
                            </span>
                          </div>
                          {errors.challanWeight && touched.challanWeight && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.challanWeight}
                            </div>
                          )}
                        </Col>
                        <Col>
                          <label className="form-label">Diff:</label>
                          <div className="input-group">
                            <Field
                              name="diff"
                              className={`form-control form-control-sm ${
                                touched.diff && errors.diff ? "is-invalid" : ""
                              }`}
                              style={{ height: "30px", fontSize: "12px" }}
                            />
                            <span
                              className="input-group-text"
                              style={{
                                height: "30px",
                                lineHeight: "30px",
                                fontSize: "12px",
                                padding: "0 5px",
                              }}
                            >
                              KGS
                            </span>
                          </div>
                          {errors.diff && touched.diff && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.diff}
                            </div>
                          )}
                        </Col>
                      </Row>

                      {stationLabel !== "Not Configured" && !isPaused && (
                        <>
                          <Row>
                            {isWeighBridge && (
                              <Col xs="6">
                                <div className="d-flex align-items-center digital-text">
                                  <h1
                                    style={{
                                      backgroundColor: "#003366",
                                      color: "#ffffff",
                                      padding: "0.75rem 1rem",
                                      border: "1px solid #ccc",
                                      borderRadius: "4px",
                                      fontSize: "24px",
                                      width: "100%",
                                      boxSizing: "border-box",
                                      height: "3.5rem",
                                      textAlign: "center",
                                      fontFamily: "'Roboto Mono', monospace",
                                      letterSpacing: "0.1rem",
                                    }}
                                  >
                                    {displayData}
                                  </h1>
                                </div>
                              </Col>
                            )}

                            {/* Conditionally render the camera capture button */}
                            {isCameraCapture && (
                              <Col xs="6">
                                <div className="text-start mt-3">
                                  <Button
                                    onClick={fetchData}
                                    color="primary"
                                    disabled={isPaused || fetchingImages}
                                    aria-label="Fetch Camera Data"
                                  >
                                    {fetchingImages ? (
                                      <span>
                                        <Spinner size="sm" /> Fetching...
                                      </span>
                                    ) : (
                                      "Fetch"
                                    )}
                                  </Button>
                                </div>
                              </Col>
                            )}
                          </Row>

                          {!isPaused && isCameraCapture && (
                            <>
                              <CardHeader className="align-items-center d-flex border-bottom-dashed">
                                <h4 className="card-title mb-0 flex-grow-1 mb-2">
                                  Camera Captures
                                </h4>
                              </CardHeader>
                              <CardBody>
                                {cameraData === null ||
                                cameraData.length === 0 ? (
                                  <p>No Images</p>
                                ) : (
                                  <Swiper spaceBetween={20} slidesPerView={1}>
                                    {cameraData.map((item, index) => (
                                      <SwiperSlide key={index}>
                                        <img
                                          src={`data:image/jpeg;base64,${item.imageBase64}`}
                                          alt={`Camera Capture ${index}`}
                                          className="img-fluid"
                                        />
                                      </SwiperSlide>
                                    ))}
                                  </Swiper>
                                )}
                              </CardBody>
                            </>
                          )}
                        </>
                      )}

                      {/* Submit Button */}
                      <div className="mb-2">
                        <Button
                          color="primary"
                          onClick={submitForm}
                          style={{ marginTop: "12px", width: "100%" }}
                        >
                          Submit
                        </Button>
                      </div>
                    </>
                  )}
                </Formik>
              </Form>
            )}
          </Formik>
        </div>
        <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Station Information</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                StationIP: "",
                StationPort: "",
              }}
              validationSchema={StationSchema}
              onSubmit={(values, { resetForm }) => {
                handleModalSave(values, resetForm);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field
                    name="StationIP"
                    render={({ field }) => (
                      <CPTextBox
                        title={"Station IP"}
                        id="StationIP"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={
                          touched.StationIP && errors.StationIP
                            ? errors.StationIP
                            : ""
                        }
                      />
                    )}
                  />
                  <Field
                    name="StationPort"
                    render={({ field }) => (
                      <CPTextBox
                        title={"Station Port"}
                        id="StationPort"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={
                          touched.StationPort && errors.StationPort
                            ? errors.StationPort
                            : ""
                        }
                      />
                    )}
                  />
                  <Button color="primary" type="submit" className="mt-3">
                    Save
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </Modal>
      </ModalBody>
    </Modal>
  );
};

export default CPVoucherNumWeighmentEntryModal;
