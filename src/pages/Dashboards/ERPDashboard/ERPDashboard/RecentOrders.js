import React from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import IconsForVoucherType from "../../../Components/CPComponents/CPIcons/IconsForVoucherType";
import SimpleBar from "simplebar-react";
import moment from "moment"; // Ensure moment.js is installed

const RecentOrders = ({ queries }) => {
    // Check if queries is null, undefined, or empty
    if (!queries || queries.length === 0) {
        return <p className="text-muted">No recent queries available.</p>;
    }

    return (
        <Col xxl={12}>
            <Card className="card-height-100">
                <CardHeader className="card-header align-items-center d-flex">
                    {IconsForVoucherType("Recent Activity")}
                    <h4 className="card-title mb-0 flex-grow-1">Recent Trainings</h4>
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
                                            {/* Display Module */}
                                            <h6 className="fs-14 mb-1">
                                                {individualData.Module || "N/A"}
                                            </h6>
                                            <Col>
                                                {/* Display Sub Module */}
                                                <Row className="mb-0">
                                                    <span className="text-muted fs-12 d-flex align-items-center mb-0" style={{ lineHeight: "1.1" }}>
                                                        <i className="mdi mdi-circle-medium text-success fs-15 me-1"></i>
                                                        Sub Module: {individualData["Sub module"] || "N/A"}
                                                    </span>
                                                </Row>

                                                {/* Display Form */}
                                                <Row className="mb-0">
                                                    <span className="text-muted fs-12 d-flex align-items-center mb-0" style={{ lineHeight: "1.1" }}>
                                                        <i className="mdi mdi-circle-medium text-success fs-15 me-1"></i>
                                                        Form: {individualData.Form || "N/A"}
                                                    </span>
                                                </Row>

                                                {/* Display Task */}
                                                <Row className="mb-0">
                                                    <span className="text-muted fs-12 d-flex align-items-center mb-0" style={{ lineHeight: "1.1" }}>
                                                        <i className="mdi mdi-circle-medium text-success fs-15 me-1"></i>
                                                        Task: {individualData.Task || "N/A"}
                                                    </span>
                                                </Row>

                                                {/* Display Status */}
                                                <Row className="mb-0">
                                                    <span className="text-muted fs-12 d-flex align-items-center mb-0" style={{ lineHeight: "1.1" }}>
                                                        <i className="mdi mdi-circle-medium text-success fs-15 me-1"></i>
                                                        Status: {individualData.Status || "N/A"}
                                                    </span>
                                                </Row>

                                                {/* Display Client Remarks */}
                                                <Row className="mb-0">
                                                    <span className="text-muted fs-12 d-flex align-items-center mb-0" style={{ lineHeight: "1.1" }}>
                                                        <i className="mdi mdi-circle-medium text-success fs-15 me-1"></i>
                                                        Client Remarks: {individualData["Client Remarks"] || "N/A"}
                                                    </span>
                                                </Row>

                                                {/* Display Codeplayers Remarks */}
                                                <Row className="mb-0">
                                                    <span className="text-muted fs-12 d-flex align-items-center mb-0" style={{ lineHeight: "1.1" }}>
                                                        <i className="mdi mdi-circle-medium text-success fs-15 me-1"></i>
                                                        Codeplayers Remarks: {individualData["Codeplayers Remarks"] || "N/A"}
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
