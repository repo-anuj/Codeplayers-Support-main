import React, { useState } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import IconsForVoucherType from "../../../Components/CPComponents/CPIcons/IconsForVoucherType";
import SimpleBar from "simplebar-react";
import moment from "moment";
import { useNavigate } from "react-router-dom"; // For navigation
import DailyStatusModal from "./DailyStatusModal"; // Import the modal component

const ReviewPending = ({ queries }) => {
    const navigate = useNavigate();

    // State to manage modal visibility and selected row data
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    console.log(queries);
    // Filter queries to exclude those with status "Done"
    const filteredQueries = queries?.filter(
        (query) => query.CurrentStatus === null
    ) || [];

    // Handle card click: Set data to localStorage and navigate to the ticket details page
    const handleCardClick = (queryData) => {
        setSelectedRow(queryData); // Set selected row data
        setModalOpen(true); // Open the modal
    };

    if (filteredQueries.length === 0) {
        return <p className="text-muted">No review pending queries available.</p>;
    }

    return (
        <Col xxl={12}>
            <Card className="card-height-100">
                <CardHeader className="card-header align-items-center d-flex">
                    {IconsForVoucherType("Currently Active Queries")}
                    <h4 className="card-title mb-0 flex-grow-1">Review By Support Pending</h4>
                    <div className="fs-16 fw-bold">{filteredQueries.length}</div>
                </CardHeader>
                <CardBody className="p-0">
                    <SimpleBar style={{ height: "435px" }}>
                        <div className="p-0">
                            {filteredQueries.map((individualData, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleCardClick(individualData)} // Open modal on card click
                                    style={{
                                        cursor: "pointer",
                                        borderBottom: "1px solid #e9ecef",
                                        backgroundColor:
                                            index % 2 === 0
                                                ? "rgba(208, 233, 255, 0.2)" // Light blue shade
                                                : "rgba(208, 255, 214, 0.2)", // Light green shade
                                    }}
                                    className="text-muted mb-3 fs-11"
                                >
                                    <div className="d-flex align-items-center">
                                        <div className="avatar-xs flex-shrink-0">
                                            <span className="avatar-title bg-light rounded-circle">
                                                {IconsForVoucherType(
                                                    individualData.Module !== "NULL"
                                                        ? individualData.Module
                                                        : "N/A"
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex-grow-1 ms-2">
                                            <h6 className="fs-14 mb-1">
                                                {individualData.Module !== "NULL"
                                                    ? individualData.Module
                                                    : "N/A"}
                                            </h6>
                                            <Row>
                                                <span className="text-muted fs-12 mb-0">
                                                    <i className="mdi mdi-circle-medium text-success fs-15 me-1"></i>
                                                    Date:{" "}
                                                    {moment.utc(individualData.ReportDateTime).local().format(
                                                        "DD MMM - hh:mm A"
                                                    )}
                                                </span>
                                                <span className="text-muted fs-12 mb-0">
                                                    <i className="mdi mdi-circle-medium text-success fs-15 me-1"></i>
                                                    User: {individualData.TicketUser}
                                                </span>
                                                <span className="text-muted fs-12 mb-0">
                                                    <i className="mdi mdi-circle-medium text-success fs-15 me-1"></i>
                                                    Subject: {individualData.QuerySubject}
                                                </span>
                                                <span className="text-muted fs-12 mb-0">
                                                    <i className="mdi mdi-circle-medium text-success fs-15 me-1"></i>
                                                    Support User: {individualData.SupportUser}
                                                </span>
                                                <span className="text-muted fs-12 mb-0">
                                                    <i className="mdi mdi-circle-medium text-success fs-15 me-1"></i>
                                                    Status: {individualData.Status}
                                                </span>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SimpleBar>
                </CardBody>
            </Card>

            {/* Pass modal state and data to the DailyStatusModal */}
            <DailyStatusModal
                modalOpen={modalOpen}
                modalData={selectedRow} // Pass selected row data to modal
                selectedRow={selectedRow} // Also pass for form submission
                onClose={() => { setModalOpen(false); window.location.reload(); }}
 // Close modal
            />
        </Col>
    );
};

export default ReviewPending;
