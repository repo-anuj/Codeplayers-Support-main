import React from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import IconsForVoucherType from "../../../Components/CPComponents/CPIcons/IconsForVoucherType";
import SimpleBar from "simplebar-react";
import moment from "moment";
import { useNavigate } from "react-router-dom"; // For navigation

const ReviewPending = ({ queries }) => {
    const navigate = useNavigate();

    // Filter queries to exclude those with status "Done"
    const filteredQueries = queries?.filter(
        (query) => query.CurrentStatus !== "Done"
    ) || [];

    // Handle card click: Set data to localStorage and navigate to the ticket details page
    const handleCardClick = (queryData) => {
        localStorage.setItem("query", JSON.stringify(queryData));
        navigate("/ticketdetails"); // Navigate to your ticket details page
    };

    if (filteredQueries.length === 0) {
        return <p className="text-muted">No review pending queries available.</p>;
    }

    return (
        <Col xxl={12}>
            <Card className="card-height-100">
                <CardHeader className="card-header align-items-center d-flex">
                    {IconsForVoucherType("Currently Active Queries")}
                    <h4 className="card-title mb-0 flex-grow-1">Currently Active Queries</h4>
                    <div className="fs-16 fw-bold">{filteredQueries.length}</div>
                </CardHeader>
                <CardBody className="p-0">
                    <SimpleBar style={{ height: "435px" }}>
                        <div className="p-0">
                            {filteredQueries.map((individualData, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleCardClick(individualData)} // Add onClick
                                    style={{
                                        cursor: "pointer", // Add hover pointer
                                        borderBottom: "1px solid #e9ecef",
                                        backgroundColor:
                                            index % 2 === 0
                                                ? "rgba(208, 233, 255, 0.2)"
                                                : "rgba(208, 255, 214, 0.2)", // Alternate colors
                                    }}
                                    className="text-muted px-3 py-2"
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
                                                    {moment.utc(individualData.ReportDateTime).local().format("DD MMM - hh:mm A")}
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
        </Col>
    );
};

export default ReviewPending;
