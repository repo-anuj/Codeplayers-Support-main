import React from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import IconsForVoucherType from "../../../Components/CPComponents/CPIcons/IconsForVoucherType";
import SimpleBar from "simplebar-react";
import moment from "moment"; // Ensure moment.js is installed

const RecentOrders = ({ queries }) => {
    // Check if queries is null, undefined, or empty 

    console.log(queries);

    if (!queries || queries.length === 0) {
        return <p className="text-muted">No recent queries available.</p>;
    }

    return (
        <Col xxl={12}>
            <Card className="card-height-100">
                <CardHeader className="card-header align-items-center d-flex">
                    {IconsForVoucherType("Recent Activity")}
                    <h4 className="card-title mb-0 flex-grow-1">Recent Queries</h4>
                </CardHeader>
                <CardBody className="p-0">
                    <SimpleBar style={{ height: "435px" }}>
                        <div className="p-3">
                            {queries.map((individualData, index) => (
                                <div key={index} className="text-muted mb-3 fs-11">
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
                                            {/* Module */}
                                            <h6 className="fs-14 mb-1">
                                                {individualData.Module !== "NULL"
                                                    ? individualData.Module
                                                    : "N/A"}
                                            </h6>
                                            <Col>
                                                <Row className="mb-0">
                                                    {" "}
                                                    {/* No bottom margin for Row */}
                                                    {/* Date and Time */}
                                                    <span
                                                        className="text-muted fs-12 d-flex align-items-center mb-0"
                                                        style={{ lineHeight: "1.1" }}
                                                    >
                                                        {/* Reduced line height */}
                                                        <i className="mdi mdi-circle-medium text-success fs-15 me-1"></i>
                                                        Date:{" "}
                                                        {moment.utc(individualData.ReportDateTime).local().format("DD MMM - hh:mm A")}
                                                    </span>

                                                </Row>
                                                <Row className="mb-0">
                                                    {" "}
                                                    {/* No bottom margin for Row */}
                                                    {/* Username as Bullet Point */}
                                                    <span
                                                        className="text-muted fs-12 d-flex align-items-center mb-0"
                                                        style={{ lineHeight: "1.1" }}
                                                    >
                                                        {" "}
                                                        {/* Reduced line height */}
                                                        <i className="mdi mdi-circle-medium text-success fs-15 me-1"></i>
                                                        User: {individualData.TicketUser}
                                                    </span>
                                                </Row>
                                                <Row className="mb-0">
                                                    {" "}
                                                    {/* No bottom margin for Row */}
                                                    {/* Subject with Ellipsis */}
                                                    <span
                                                        className="text-muted fs-12 text-truncate mb-0 d-flex align-items-center"
                                                        style={{
                                                            maxWidth: "250px", // Adjust width as needed
                                                            overflow: "hidden",
                                                            whiteSpace: "nowrap",
                                                            textOverflow: "ellipsis",
                                                            lineHeight: "1.1", // Reduced line height
                                                        }}
                                                    >
                                                        <i className="mdi mdi-circle-medium text-success fs-15 me-1"></i>
                                                        Subject: {individualData.QuerySubject}
                                                    </span>
                                                </Row>
                                                <br />

                                                <Row className="mb-0">
                                                    {" "}
                                                    {/* No bottom margin for Row */}
                                                    {/* Support User */}
                                                    <span
                                                        className="text-muted fs-12 d-flex align-items-center mb-0"
                                                        style={{ lineHeight: "1.1" }}
                                                    >
                                                        {" "}
                                                        {/* Reduced line height */}
                                                        <i className="mdi mdi-circle-medium text-success fs-15 me-1"></i>
                                                        Support User: {individualData.SupportUser}
                                                    </span>
                                                </Row>
                                                <Row className="mb-0">
                                                    {" "}
                                                    {/* No bottom margin for Row */}
                                                    {/* Status */}
                                                    <span
                                                        className="text-muted fs-12 d-flex align-items-center mb-0"
                                                        style={{ lineHeight: "1.1" }}
                                                    >
                                                        {" "}
                                                        {/* Reduced line height */}
                                                        <i className="mdi mdi-circle-medium text-success fs-15 me-1"></i>
                                                        Status: {individualData.CurrentStatus}
                                                    </span>
                                                </Row>
                                            </Col>
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

export default RecentOrders;
