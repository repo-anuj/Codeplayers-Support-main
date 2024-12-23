import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
const formatLocalDateTime = (date) => {
    const offset = date.getTimezoneOffset(); // Difference between UTC and local time in minutes
    const localDate = new Date(date.getTime() - offset * 60 * 1000); // Adjust for the local time
    return localDate.toISOString().slice(0, 16); // Slice to match the format required for datetime-local
};

const RaiseTicketModal = ({ isOpen, toggle, onSubmit }) => {
    
    const [clientName, setClientName] = useState("");

    // Dummy data for modules
    const modules = ["Finance And Accounts", "Security Gate", "Weighment","Raw Materials"];

    useEffect(() => {
        // Fetch client name from local storage
        const storedClientName = localStorage.getItem('email2');
        setClientName(storedClientName || ""); // Set clientName from localStorage or default to empty
    }, []);

    const handleSubmit = (e) => {
        onSubmit();
        e.preventDefault();
        alert("Ticket raised successfully!");
        
        toggle(); // Close modal after submission
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} size="lg">
            <ModalHeader toggle={toggle}>Raise a Ticket</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    {/* Client Details */}
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="clientName">Client</Label>
                                <Input
                                    type="text"
                                    name="clientName"
                                    id="clientName"
                                    value={clientName}
                                    disabled
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="contactPerson">Contact Person Name</Label>
                                <Input
                                    type="text"
                                    name="contactPerson"
                                    id="contactPerson"
                                    placeholder="Enter contact person"
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="whatsappNumber">WhatsApp Number</Label>
                                <Input
                                    type="text"
                                    name="whatsappNumber"
                                    id="whatsappNumber"
                                    placeholder="Enter WhatsApp number"
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter email address"
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="user">User</Label>
                                <Input
                                    type="text"
                                    name="user"
                                    id="user"
                                    value="Auto-Generated User"
                                    disabled
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    {/* Module Selection */}
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="moduleSelect">Module</Label>
                                <Input type="select" name="moduleSelect" id="moduleSelect" required>
                                    {modules.map((module, index) => (
                                        <option key={index} value={module}>
                                            {module}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>

                    {/* Ticket Information */}
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="ticketID">Ticket ID</Label>
                                <Input
                                    type="text"
                                    name="ticketID"
                                    id="ticketID"
                                    value="3013760"
                                    disabled
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="reportingOn">Reporting On</Label>
                                <Input
                                    type="datetime-local"
                                    name="reportingOn"
                                    id="reportingOn"
                                    value={formatLocalDateTime(new Date())}
                                    disabled
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    {/* Subject */}
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="subject">Subject</Label>
                                <Input
                                    type="text"
                                    name="subject"
                                    id="subject"
                                    placeholder="Enter query subject"
                                    required
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    {/* Query Details */}
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="queryDetails">Query Details</Label>
                                <Input
                                    type="textarea"
                                    name="queryDetails"
                                    id="queryDetails"
                                    rows="4"
                                    placeholder="Enter query details"
                                    required
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    {/* Upload Media */}
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="uploadMedia">Upload Media</Label>
                                <Input type="file" name="uploadMedia" id="uploadMedia" />
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>
                    Submit
                </Button>{" "}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default RaiseTicketModal;
