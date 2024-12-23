import React from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import IconsForVoucherType from "../../../Components/CPComponents/CPIcons/IconsForVoucherType";
import SimpleBar from "simplebar-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const CriticalQueries = ({ queries }) => {
    const navigate = useNavigate();

    // Check if queries is null, undefined, or empty
    if (!queries || queries.length === 0) {
        return <p className="text-muted">No recent queries available.</p>;
    }

    const criticalQueries = queries.filter((query) => query.IsCritical);

    const handleCardClick = (queryData) => {
        localStorage.setItem("query", JSON.stringify(queryData));
        navigate("/ticketdetails");
    };

    return (
        <Col xxl={12}>
            <Card className="card-height-100">
                <CardHeader className="card-header align-items-center d-flex">
                    {IconsForVoucherType("Recent Activity")}
                    <h4 className="card-title mb-0 flex-grow-1">Critical Queries</h4>
                    {/* Display the count aligned to the right */}
                    <div className="fs-16 fw-bold">{criticalQueries.length}</div>
                </CardHeader>
                <CardBody className="p-0">
                    <SimpleBar style={{ height: "435px" }}>
                        <div className="p-0">
                            {criticalQueries.map((individualData, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleCardClick(individualData)}
                                    style={{
                                        cursor: "pointer",
                                        borderBottom: "1px solid #e9ecef",
                                        backgroundColor:
                                            index % 2 === 0
                                                ? "rgba(208, 233, 255, 0.2)" // Light blue shade
                                                : "rgba(208, 255, 214, 0.2)", // Light green shade
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
                                                    Status: {individualData.CurrentStatus}
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

export default CriticalQueries;
