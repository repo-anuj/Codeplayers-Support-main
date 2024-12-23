// Updated imports
import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Label,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Flatpickr from "react-flatpickr";
import {
    GET_SupportDashboard,
    GET_SUPPORTUSER,
    GET_SUPPORTSTATUSLIST,
    POST_DailyStatus,
    PATCH_DailyStatus,
} from "../../../slices/thunks";
import moment from "moment";
const DailyStatusModal = ({ modalOpen, modalData, selectedRow, onClose }) => {
    const dispatch = useDispatch();
    const SupportUserData = useSelector((state) => state.SupportUser.data);
    const SupportStatusData = useSelector((state) => state.SupportStatuses.data);
    const userType=localStorage.getItem('userType');
    // Synchronize modal state with the prop
    const [modal, setModal] = useState(modalOpen);

    useEffect(() => {
        setModal(modalOpen); // Sync modal state with parent
    }, [modalOpen]);

    useEffect(() => {
        dispatch(GET_SupportDashboard());
        dispatch(GET_SUPPORTUSER());
        dispatch(GET_SUPPORTSTATUSLIST());
    }, [dispatch]);

    const toggleModal = () => {
        setModal(!modal);
        if (onClose) onClose(); // Notify parent about closing
    };

    const validationSchema = Yup.object({
        TicketNumber: Yup.string().required("Ticket Number is required"),
        SupportUser: Yup.string().required("Support User is required"),
        CurrentStatus: Yup.string().required("Status is required"),
        statusDate: Yup.date().required("Status Date is required"),
        DueDate: Yup.date().required("Due Date is required"),
        solutionDetails: Yup.string().required("Solution Details are required"),
        dailyID: Yup.string(),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            values.SupportID = selectedRow.SupportID;
            if (!values.dailyID) {
                await dispatch(POST_DailyStatus({ body: values }));
            } else {
                await dispatch(PATCH_DailyStatus({ body: values }));
            }
            toggleModal(); // Close modal after submission
        } catch (error) {
            console.error("Error during form submission:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const extractOptions = (data, idKey, nameKey) =>
        data
            ? data.map((item) => ({ id: item[idKey], name: item[nameKey] }))
            : [];

    const SupportUser = extractOptions(SupportUserData, "SubUserID", "Name");
    const statusOptions = extractOptions(SupportStatusData, "StatusID", "Status");

    return (
        <Modal isOpen={modal} toggle={toggleModal} size="lg">
            <ModalHeader toggle={toggleModal}>Update Query Details</ModalHeader>
            <ModalBody>
                {modalData || selectedRow ? (
                    <Formik
                        initialValues={{
                            TicketNumber:
                                modalData?.TicketNumber || selectedRow?.TicketNumber || "",
                            SupportUser:
                                modalData?.SupportUser || selectedRow?.SupportUser || "",
                            CurrentStatus:
                                modalData?.SupportStatus || selectedRow?.SupportStatus || "",
                            statusDate: modalData?.StatusDate
                                ? new Date(moment.utc(modalData.StatusDate).local()) // Convert modalData.StatusDate to local timezone
                                : selectedRow?.StatusDate // Check selectedRow.StatusDate
                                    ? (() => {
                                        const [datePart, timePart] = selectedRow.StatusDate.split(" ");
                                        const [day, month, year] = datePart.split("/").map(Number);
                                        const [hours, minutes, seconds] = timePart.split(":").map(Number);
                                        return new Date(year, month - 1, day, hours, minutes, seconds); // Default to selectedRow.StatusDate in local timezone
                                    })()
                                    : new Date(), // Default to current date if none is available

                            DueDate: modalData?.DueDate && modalData.DueDate !== "0001-01-01T00:00:00"
                                ? new Date(moment.utc(modalData.DueDate).local()) // Convert modalData.DueDate to local timezone
                                : selectedRow?.DueDate && selectedRow.DueDate !== "0001-01-01T00:00:00"
                                    ? new Date(moment.utc(selectedRow.DueDate).local()) // Convert selectedRow.DueDate to local timezone
                                    : new Date(new Date().setDate(new Date().getDate() + 7)), // Default to current date + 7 days in local timezone

                            solutionDetails: modalData?.Remarks || "",
                            dailyID: modalData?.DailyID || "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, setFieldValue }) => (
                            <Form>
                                <Row className="gy-3">
                                    <Col md={6} xs={12}>
                                        <Label for="ticketNumber">Ticket Number:</Label>
                                        <Field
                                            name="TicketNumber"
                                            type="text"
                                            className="form-control"
                                            readOnly
                                            disabled={userType === "Infinity-ERP"}
                                        />
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <Label for="SupportUser">Support User:</Label>
                                        <Field
                                            name="SupportUser"
                                            as="select"
                                            className="form-control"
                                            disabled={userType === "Infinity-ERP"}
                                        >
                                            <option value="">Select</option>
                                            {SupportUser.map((option) => (
                                                <option key={option.id} value={option.id}>
                                                    {option.name}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage
                                            name="SupportUser"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </Col>
                                    <Col md={4} xs={12}>
                                        <Label for="CurrentStatus">Status:</Label>
                                        <Field
                                            name="CurrentStatus"
                                            as="select"
                                            className="form-control"
                                            disabled={userType === "Infinity-ERP"}
                                        >
                                            <option value="">Select</option>
                                            {statusOptions.map((option) => (
                                                <option key={option.id} value={option.id}>
                                                    {option.name}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage
                                            name="CurrentStatus"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </Col>
                                    <Col md={4} xs={12}>
                                        <Label for="statusDate">Status Date:</Label>
                                        <Flatpickr
                                            id="statusDate"
                                            className="form-control"
                                            value={values.statusDate}
                                            onChange={(dates) => setFieldValue("statusDate", dates[0])}
                                            options={{ dateFormat: "d-m-Y" }}
                                            disabled={userType === "Infinity-ERP"}
                                        />
                                        <ErrorMessage
                                            name="statusDate"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </Col>
                                    <Col md={4} xs={12}>
                                        <Label for="DueDate">Due Date:</Label>
                                        <Flatpickr
                                            id="DueDate"
                                            className="form-control"
                                            value={values.DueDate}
                                            onChange={(dates) => setFieldValue("DueDate", dates[0])}
                                            options={{ dateFormat: "d-m-Y" }}
                                            disabled={userType === "Infinity-ERP"}
                                        />
                                        <ErrorMessage
                                            name="DueDate"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </Col>
                                    <Col xs={12}>
                                        <Label for="solutionDetails">Solution Details:</Label>
                                        <Field
                                            name="solutionDetails"
                                            as="textarea"
                                            rows="4"
                                            className="form-control"
                                            disabled={userType === "Infinity-ERP"}
                                        />
                                        <ErrorMessage
                                            name="solutionDetails"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </Col>
                                </Row>
                                <ModalFooter>
                                    <Button color="primary" type="submit" disabled={userType === "Infinity-ERP"}>
                                        Submit
                                    </Button>
                                    <Button color="secondary" onClick={toggleModal}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </Form>
                        )}
                    </Formik>
                ) : (
                    <p>No data available.</p>
                )}
            </ModalBody>
        </Modal>

    );
};

export default DailyStatusModal;