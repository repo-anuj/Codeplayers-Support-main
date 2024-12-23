import React, { useState, useEffect } from "react";
import ModuleCharts from "./ModuleCharts";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import IconsForVoucherType from "../../../Components/CPComponents/CPIcons/IconsForVoucherType";
import SimpleBar from "simplebar-react";

const ModuleWiseDistribution = ({ data }) => {
    const [chartData, setChartData] = useState([]);
    const [moduleLabels, setModuleLabels] = useState([]);
    const [moduleSummary, setModuleSummary] = useState({});

    useEffect(() => {
        if (data && data.length > 0) {
            const summary = calculateModuleSummary(data);
            const chartSeries = Object.values(summary).map((mod) => mod.totalQueries);
            const labels = Object.keys(summary); // Module names
            setModuleSummary(summary);
            setChartData(chartSeries);
            setModuleLabels(labels);
        }
    }, [data]);

    // Function to calculate summary of modules and their query statuses
    const calculateModuleSummary = (data) => {
        let summary = {};
        data.forEach((item) => {
            const moduleName = item.Module;
            const currentStatus = item.CurrentStatus;

            // Initialize module summary if not exists
            if (!summary[moduleName]) {
                summary[moduleName] = {
                    totalQueries: 0,
                    statusCounts: {
                        Done: 0,
                        SRP: 0, // Service Review Pending
                        CRP: 0, // Client Review Pending
                        DEV: 0, // For Development
                        Others: 0, // New category for unmatched statuses
                    },
                };
            }

            // Increment total queries for the module
            summary[moduleName].totalQueries += 1;

            // Increment status count based on current status
            if (currentStatus === "Support Review Pending") {
                summary[moduleName].statusCounts["SRP"] += 1;
            } else if (currentStatus === "Client Review Pending") {
                summary[moduleName].statusCounts["CRP"] += 1;
            } else if (currentStatus === "Development Review Pending") {
                summary[moduleName].statusCounts["DEV"] += 1;
            } else if (currentStatus === "Done") {
                summary[moduleName].statusCounts["Done"] += 1;
            } else {
                summary[moduleName].statusCounts["Others"] += 1; // Increment "Others" for unmatched statuses
            }
        });
        return summary;
    };

    return (
        <React.Fragment>
            <Col xxl={12} className="p-0">
                <Card style={{ height: "487px", width: "100%" }}>
                    <CardHeader className="card-header align-items-center d-flex">
                        {IconsForVoucherType("Recent Activity")}
                        <h4 className="card-title mb-0 flex-grow-1">Module Wise Distribution</h4>
                    </CardHeader>
                    <CardBody
                        style={{
                            height: "calc(100% - 40px)", // Adjust height relative to the header
                            overflowY: "auto", // Single vertical scroll
                            overflowX: "hidden", // Prevent horizontal scrolling
                            padding: "0", // Remove padding from CardBody
                        }}
                    ><SimpleBar style={{ height: "100%", overflowX: "hidden" }}>
                        {/* Displaying the doughnut chart */}
                        <ModuleCharts
                            series={chartData}
                            moduleLabels={moduleLabels} // Pass dynamic labels here
                            dataColors='["--vz-primary", "--vz-info", "--vz-warning", "--vz-success"]'
                        />

                        {/* Displaying card-like module data */}
                        
                            <div className="p-0">
                                {Object.keys(moduleSummary).map((moduleName, index) => (
                                    <div
                                        key={index}
                                        className="text-muted fs-11"
                                        style={{
                                            cursor: "pointer",
                                            borderBottom: "1px solid #e9ecef",
                                            marginBottom: 0,
                                            width: "100%", // Ensure full width
                                            backgroundColor:
                                                index % 2 === 0
                                                    ? "rgba(208, 233, 255, 0.2)" // Light blue shade
                                                    : "rgba(208, 255, 214, 0.2)", // Light green shade
                                        }}
                                    >
                                        <div className="d-flex align-items-center">
                                            <div className="avatar-xs flex-shrink-0">
                                                <span className="avatar-title bg-light rounded-circle">
                                                    {IconsForVoucherType(moduleName !== "NULL" ? moduleName : "N/A")}
                                                </span>
                                            </div>
                                            <div className="flex-grow-1 ms-2 d-flex justify-content-between align-items-center">
                                                {/* Module Name and Total Queries */}
                                                <h6 className="fs-14 mb-1">{moduleName !== "NULL" ? moduleName : "N/A"}</h6>
                                                <span className="fs-16 fw-bold p-2">
                                                    {moduleSummary[moduleName].totalQueries}
                                                </span>
                                            </div>
                                        </div>
                                        <Row className="mb-0">
                                            {/* Status-wise Queries */}
                                            {Object.entries(moduleSummary[moduleName].statusCounts).map(([status, count], idx) => (
                                                <div
                                                    key={idx}
                                                    className="text-muted fs-12 mb-0 d-flex w-50"
                                                    style={{ lineHeight: "1.1", marginLeft: "20px" }}
                                                >
                                                    <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                                                        <i className="mdi mdi-circle-medium text-success fs-15 me-1"></i>
                                                        <span className="me-2">{status}</span>
                                                    </div>
                                                    <div style={{ minWidth: "40px", textAlign: "center" }}>
                                                        {count}
                                                    </div>
                                                </div>
                                            ))}
                                        </Row>
                                    </div>
                                ))}
                            </div>
                        </SimpleBar>
                    </CardBody>
                </Card>
            </Col>


        </React.Fragment>
    );
};

export default ModuleWiseDistribution;
