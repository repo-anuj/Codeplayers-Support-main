import React, { useState, useEffect } from 'react';
import ModuleCharts from './ModuleCharts';
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import IconsForVoucherType from "../../../Components/CPComponents/CPIcons/IconsForVoucherType";
import SimpleBar from "simplebar-react";

const ModuleData = ({ data }) => {
    const moduleData = data; // Assuming this is the incoming data
    const [chartData, setChartData] = useState([]);
    const [moduleLabels, setModuleLabels] = useState([]);
    const [moduleSummary, setModuleSummary] = useState({});

    console.log(data);

    useEffect(() => {
        if (moduleData && moduleData.length > 0) {
            const summary = calculateModuleSummary(moduleData);
            const chartSeries = Object.values(summary).map(mod => mod.totalQueries);
            const labels = Object.keys(summary);  // Module names
            setModuleSummary(summary);
            setChartData(chartSeries);
            setModuleLabels(labels);
        }
    }, [moduleData]);

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
                        "Done": 0,
                        "SRP": 0, // Service Review Pending
                        "CRP": 0, // Client Review Pending
                        "DEV": 0, // For Development
                        "Others": 0, // New category for any unmatched status
                    },
                };
            }

            // Increment total queries for the module
            summary[moduleName].totalQueries += 1;

            // Increment status count based on current status
            if (currentStatus === "Service Review Pending") {
                summary[moduleName].statusCounts["SRP"] += 1;
            } else if (currentStatus === "Client Review Pending") {
                summary[moduleName].statusCounts["CRP"] += 1;
            } else if (currentStatus === "For Development") {
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
            <div className="col-xxl-12 overflow-auto">
                <div className="card card-height-100">
                    <div className="card-header border-0 align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Module Data</h4>
                    </div>
                    <div className="card-body">
                        {/* Displaying the doughnut chart */}
                        <ModuleCharts
                            series={chartData}
                            moduleLabels={moduleLabels}  // Pass dynamic labels here
                            dataColors='["--vz-primary", "--vz-info", "--vz-warning", "--vz-success"]'
                        />

                        {/* Displaying card-like module data to match recent orders layout */}
                        <SimpleBar style={{ maxHeight: "400px", overflowX:"hidden" }}>
                            <div className="p-3 overflowX-hidden">
                                {Object.keys(moduleSummary).map((moduleName, index) => (
                                    <div key={index} className="text-muted mb-3 fs-11 overflowX-hidden">
                                        <div className="d-flex align-items-center">
                                            <div className="avatar-xs flex-shrink-0">
                                                <span className="avatar-title bg-light rounded-circle">
                                                    {IconsForVoucherType(moduleName !== "NULL" ? moduleName : "N/A")}
                                                </span>
                                            </div>
                                            <div className="flex-grow-1 ms-2 d-flex justify-content-between align-items-center">
                                                {/* Module Name and Total Queries */}
                                                <h6 className="fs-14 mb-1">{moduleName !== "NULL" ? moduleName : "N/A"}</h6>
                                                <span className="fs-16 fw-bold">{moduleSummary[moduleName].totalQueries}</span>
                                            </div>
                                        </div>
                                        <Row className="mb-0">
                                            {/* Status-wise Queries */}
                                            {Object.entries(moduleSummary[moduleName].statusCounts).map(([status, count], idx) => (
                                                <div key={idx} className="text-muted fs-12 mb-0 d-flex w-50" style={{ lineHeight: "1.1", marginLeft: "20px" }}>
                                                    <div style={{ flex: 1, display: "flex", alignItems: "center" }}> {/* Status Column */}
                                                        <i className="mdi mdi-circle-medium text-success fs-15 me-1"></i>
                                                        <span className="me-2">{status}</span> {/* Status label */}
                                                    </div>
                                                    <div style={{ minWidth: "40px", textAlign: "centre" }}> {/* Count Column */}
                                                        {count}
                                                    </div>
                                                </div>
                                            ))}
                                        </Row>
                                    </div>
                                ))}
                            </div>
                        </SimpleBar>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ModuleData;
